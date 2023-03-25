package main

import (
	"github.com/gin-contrib/cors"
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

	// Add CORS middleware
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"} // Allow requests from your Next.js app
	config.AllowMethods = []string{"POST"}                  // Allow specific HTTP methods
	config.AllowHeaders = []string{"Content-Type"}          // Allow specific headers
	r.Use(cors.New(config))

	// Register user endpoint
	api.RegisterUser(r, client)
	api.LoginUser(r, client)

	// Run the server on port 9595
	r.Run(":9595")
}
