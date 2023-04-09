# Use a more recent base image with OpenJDK 11 and specify the platform
FROM --platform=linux/amd64 adoptopenjdk/openjdk11:latest as builder

# Set the working directory
WORKDIR /app

# Install Maven
RUN apt-get update && \
    apt-get install -y maven && \
    rm -rf /var/lib/apt/lists/*

# Copy the pom.xml and source code into the working directory
COPY pom.xml ./
COPY src ./src

# Run Maven clean install to build the project
RUN mvn clean install

# Use the same base image and platform for the final image
FROM --platform=linux/amd64 adoptopenjdk/openjdk11:latest

# Set the working directory
WORKDIR /app

# Copy the built artifacts from the builder stage
COPY --from=builder /app/target/grpc-cms-server-java-beta.jar ./grpc-cms-server-java-beta.jar

# Expose the desired port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "grpc-cms-server-java-beta.jar"]
