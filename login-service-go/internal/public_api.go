package internal

import (
	"context"
	"github.com/gin-gonic/gin"
	pb "github.com/olow304/login-service-go/authservice"
	"net/http"
)

type RegisterUserStruct struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

type LoginUserStruct struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func RegisterUser(router *gin.Engine, client pb.AuthServiceClient) {
	router.POST("/register", func(c *gin.Context) {
		// Extract user information
		var user RegisterUserStruct
		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Call gRPC client to register user
		response, err := client.Register(context.Background(), &pb.RegisterRequest{
			Username: user.Username,
			Password: user.Password,
			Email:    user.Email,
		})

		// Check for errors
		if err != nil {
			// Handle error sending response
			c.JSON(http.StatusBadRequest, gin.H{"Error for registering: ": err.Error()})
		}

		// Return response
		c.JSON(http.StatusOK, response)
	})
}

func LoginUser(router *gin.Engine, client pb.AuthServiceClient) {
	router.POST("/login", func(c *gin.Context) {
		// Extract user information
		var user LoginUserStruct
		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Call gRPC client to register user
		response, err := client.Login(context.Background(), &pb.LoginRequest{
			Email:    user.Email,
			Password: user.Password,
		})

		// Check for errors
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"Error for registering: ": err.Error()})
		}

		// Return response
		c.JSON(http.StatusOK, response)
	})
}
