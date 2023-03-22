package main

import (
	"github.com/gin-gonic/gin"
	pb "github.com/olow304/login-service-go/authservice"
	api "github.com/olow304/login-service-go/internal"
	"google.golang.org/grpc"
	"log"
)

func main() {
	// Create gRPC client connection
	conn, err := grpc.Dial("localhost:9090", grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()

	// Create gRPC client
	client := pb.NewAuthServiceClient(conn)

	// Create Gin router
	r := gin.Default()

	// Register user endpoint
	api.RegisterUser(r, client)
	api.LoginUser(r, client)

	// Run the server on port 9595
	r.Run(":9595")
}
