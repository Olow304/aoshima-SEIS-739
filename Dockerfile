# # Use the official Envoy image v1.20.0 which includes the gRPC-Web filter
# FROM envoyproxy/envoy:v1.20.0

# # Copy your envoy.yaml configuration file to the container
# COPY envoy.yaml /etc/envoy/envoy.yaml

# # Expose the ports used by Envoy
# EXPOSE 8080 9901
