#!/bin/bash

# Define an array of service names and image tags
services=(
  "grpc-client-service:olow/grpc-client-service"
  "analytic-service-js:olow/analytic-service-js"
  "grpc-cms-server-java:olow/grpc-cms-server-java"
  "login-service-go:olow/login-service-go"
  "cms-client-app:olow/cms-client-app"
)

# Log in to Docker Hub
docker login

# Loop through the services and build & push images
for service in "${services[@]}"; do
  IFS=":" read -ra service_info <<< "$service"
  service_name="${service_info[0]}"
  image_tag="${service_info[1]}:latest"

  echo "Building and pushing $service_name ($image_tag)..."
  docker-compose build "$service_name"

  # Get the built image name from docker-compose
  built_image=$(docker-compose images -q $service_name)

  # Tag and push the image
  docker tag "$built_image" "$image_tag"
  docker push "$image_tag"
done

echo "All images built and pushed successfully."
