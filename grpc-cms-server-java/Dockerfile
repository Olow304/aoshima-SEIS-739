# Build stage
FROM maven:3.8.3-openjdk-11 as build

# Set the working directory
WORKDIR /app

# Copy pom.xml and source code to the build stage
COPY pom.xml ./
COPY src ./src/

# Build the application
RUN mvn clean package

# Runtime stage
FROM openjdk:11-jre-slim

# Set the working directory
WORKDIR /app

# Copy the JAR file from the build stage to the runtime stage
#COPY --from=build /app/target/grpc-cms-server-java-beta.jar /app/app.jar
COPY --from=maven-builder app/target/grpc-cms-server-java-beta.jar /app/grpc-cms-server-java-beta.jar

# Set the permission for the JAR file
RUN chmod 755 /app/grpc-cms-server-java-beta.jar

# Expose the application's port
EXPOSE 9595

# Run the application
CMD ["java", "-jar", "/app/grpc-cms-server-java-beta.jar"]



