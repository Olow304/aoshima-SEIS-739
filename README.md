# Aoshima-SEIS-739
Saleban Olow <br>
Reza Valipour

### Vision Statement

We are planning to develop an easy-to-use content management system (CMS) that would allow website owners to update their content easily. We strive to create a unique and reliable system, making it simple for users to manage their content. We want to empower website owners to update content securely and efficiently. 


### Project Directories & Structure
- <strong>grpc-cms-server-java</strong>: The server side of the project. It is written in Java and uses gRPC <strong>server</strong> for communication.
- <strong>grpc-client-service</strong>: This service is using gRPC <strong>client</strong> for communication with the main server. Mainly responsibly handing client crud operation and communicating to the main server.
- <strong>login-service-go</strong>: The login service of the project. It is written in Go and uses gRPC <strong>client</strong> for communication with the server. It's generated using the gRPC-Go plugin.
- <strong>analytic-service-js</strong>: The analytic service of the project. It is written in JavaScript and uses gRPC <strong>client</strong> for communication with the server. It's generated using the gRPC-Node plugin.
- <strong>cms-client-app</strong>: This is the frontend of the project, it's using Nextjs and will be using all the services to provide a complete CMS experience.

![Image description](./images/new_diagram.png)

#### Class diagram
![Image description](./diagrams/class_diagram/class-diagram.png)


### Why gRPC?
We chose gRPC because it is a high-performance, open-source, and flexible RPC framework. It can be used in various environments, making it a great tool for microservices architecture.


### Why are we using gRPC?
Our objective is to develop microservices that effectively communicate with each other. gRPC offers several advantages for our project, including:

#### Advantages of gRPC
- Efficient communication: gRPC provides efficient communication between services, thanks to its use of HTTP/2 and Protocol Buffers. This can lead to better performance and lower resource usage, which is crucial for a CMS that may handle large amounts of data and numerous user interactions.

- Language-agnostic: Since the project consists of services written in different languages (Java, Go, and JavaScript), gRPC's support for multiple languages allows seamless integration and interoperability among these services, regardless of the language they're implemented in.

- Strongly-typed interfaces: gRPC enforces strict schemas for services and messages using Protocol Buffers. This ensures that both the client and server agree on the API contract and data structures, reducing the likelihood of bugs and making communication between services more reliable.

- Scalability: gRPC is designed to work well in distributed systems and microservices architectures. Its features, such as streaming, load balancing, and pluggable components, make it easier to scale the CMS application as the need arises.

- Easier client integration: gRPC provides client libraries for various languages, simplifying the interaction between the frontend application (Next.js in this case) and the services. This streamlines the development process and improves the overall user experience in the CMS.


### How to run the project

#### grpc-cms-server-java (using Maven):
<strong>Required:</strong><br>
- Java 11 or later
- Maven

```bash
cd grpc-cms-server-java
mvn clean install
mvn exec:java
```

#### login-service-go (Golang):
<strong>Required:</strong><br>
- Go 1.18 or later

```bash
cd login-service-go
go build ./login-service-go
```

#### analytic-service-js (Nodejs):
<strong>Required:</strong><br>
- Node.js 16+ (preferably the latest LTS version)

```bash
cd analytic-service-js
npm install
node client-api-analytic.js
```

#### grpc-client-service (Nodejs):
<strong>Required:</strong><br>
- Node.js 16+ (preferably the latest LTS version)

```bash
cd grpc-client-service
npm install
node grpc-client-public-api.js
```

#### cms-client-app (Next.js):
```bash
cd cms-client-app
npm install
npm run dev
```

