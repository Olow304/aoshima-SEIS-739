package com.olow.grpccms.grpccms.grpc;

import com.olow.grpccms.grpccms.model.User;
import com.olow.grpccms.grpccms.repository.UserRepository;
import com.olow.grpccms.grpccms.util.JwtUtil;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import io.grpc.Status;
import java.util.Optional;

@GrpcService
public class AuthServiceImpl extends AuthServiceGrpc.AuthServiceImplBase{

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public void login(LoginRequest request, io.grpc.stub.StreamObserver<LoginResponse> responseObserver) {
        System.out.println("login request: " + request);

        // Find the user by email
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Check if the provided password matches the stored password
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                // Generate the JWT
                String token = jwtUtil.generateToken(user.getUsername(), user.getEmail());

                // Return the LoginResponse with the JWT
                LoginResponse response = LoginResponse.newBuilder()
                        .setToken(token)
                        .build();
                responseObserver.onNext(response);
                responseObserver.onCompleted();
            } else {
                // Invalid password
                responseObserver.onError(Status.INVALID_ARGUMENT
                        .withDescription("Invalid email or password")
                        .asRuntimeException());
            }
        } else {
            // User not found
            responseObserver.onError(Status.NOT_FOUND
                    .withDescription("Invalid email or password")
                    .asRuntimeException());
        }
    }

    @Override
    public void register(RegisterRequest request, io.grpc.stub.StreamObserver<RegisterResponse> responseObserver) {
        System.out.println("register request: " + request);
        System.out.println( "password: " + passwordEncoder.encode(request.getPassword()));

        // save user to db
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUsername(request.getUsername());
        userRepository.save(user);

        RegisterResponse response = RegisterResponse.newBuilder()
                .setMessage("User registered successfully")
                .build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
