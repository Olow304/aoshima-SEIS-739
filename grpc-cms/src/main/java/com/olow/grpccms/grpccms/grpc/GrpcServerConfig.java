package com.olow.grpccms.grpccms.grpc;

import com.olow.grpccms.grpccms.util.AuthInterceptor;
import com.olow.grpccms.grpccms.util.JwtUtil;
import io.grpc.Server;
import io.grpc.ServerBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class GrpcServerConfig {

    @Autowired
    private JwtUtil jwtUtil;
    @Bean
    public Server grpcServer(PageServiceImpl pageService, AuthServiceImpl authService, AnalyticServiceImpl analyticService) {
        return ServerBuilder.forPort(9090)
                .addService(pageService)
                .addService(authService)
                .addService(analyticService)
                .intercept(new AuthInterceptor(jwtUtil))
                .build();
    }

    @Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
