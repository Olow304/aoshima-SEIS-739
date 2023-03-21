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

	//// Test Login
	////loginRequest := &pb.LoginRequest{
	////	Email:    "olow1@gmail.com",
	////	Password: "123",
	////}
	////ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	////defer cancel()
	////loginResponse, err := client.Login(ctx, loginRequest)
	////if err != nil {
	////	log.Fatalf("could not login: %v", err)
	////}
	////log.Printf("Received token: %s", loginResponse.GetToken())
	//
	//// Test Register
	//registerRequest := &pb.RegisterRequest{
	//	Username: "saleban",
	//	Password: "123",
	//	Email:    "olow@example.com",
	//}
	//ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	//defer cancel()
	//registerResponse, err := client.Register(ctx, registerRequest)
	//if err != nil {
	//	log.Fatalf("could not register: %v", err)
	//}
	//log.Printf("Received message: %s", registerResponse.GetMessage())
}
