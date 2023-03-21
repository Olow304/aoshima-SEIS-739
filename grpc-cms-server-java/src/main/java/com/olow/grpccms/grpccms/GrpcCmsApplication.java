package com.olow.grpccms.grpccms;

import io.grpc.Server;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class GrpcCmsApplication implements CommandLineRunner {

	private final Server grpcServer;

	public GrpcCmsApplication(Server grpcServer) {
		this.grpcServer = grpcServer;
	}

	public static void main(String[] args) {
		SpringApplication.run(GrpcCmsApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		grpcServer.start();
		System.out.println("gRPC server started on port 9090");
		grpcServer.awaitTermination();
	}
}
