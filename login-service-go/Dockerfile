# Start from the official Golang base image
FROM golang:1.17

# Set the current working directory inside the container
WORKDIR /app

# Copy the go.mod and go.sum files to download dependencies
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the source code
COPY . .

# Build the Go app
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o login-service

# Expose the required port for the login-service
EXPOSE 9595

# Run the compiled binary
CMD ["/app/login-service"]
