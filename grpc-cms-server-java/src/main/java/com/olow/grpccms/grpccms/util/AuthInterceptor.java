package com.olow.grpccms.grpccms.util;

import io.grpc.*;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.beans.factory.annotation.Autowired;


public class AuthInterceptor implements ServerInterceptor {

    private final JwtUtil jwtUtil;

    public AuthInterceptor(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }


    @Override
    public <ReqT, RespT> ServerCall.Listener<ReqT> interceptCall(ServerCall<ReqT, RespT> serverCall, Metadata metadata, ServerCallHandler<ReqT, RespT> serverCallHandler) {
        MethodDescriptor<ReqT, RespT> methodDescriptor = serverCall.getMethodDescriptor();
        String serviceName = methodDescriptor.getServiceName();

        System.out.println("Service name: " + serviceName);

        // Check if the requested service is AuthServiceImpl and allow the request without validation
        if (serviceName.endsWith("AuthService")) {
            return serverCallHandler.startCall(serverCall, metadata);
        }

        String token = metadata.get(Metadata.Key.of("authorization", Metadata.ASCII_STRING_MARSHALLER));

        if (token == null || !validateToken(token)) {
            serverCall.close(Status.UNAUTHENTICATED.withDescription("Invalid token"), metadata);
            return new ServerCall.Listener<ReqT>() {
            };
        }

        return serverCallHandler.startCall(serverCall, metadata);
    }

    private boolean validateToken(String token) {
        // Use JwtUtil to parse and validate the token
        Jws<Claims> claimsJws = jwtUtil.parseToken(token);

        // If the token is valid, claimsJws will not be null
        return claimsJws != null;
    }
}