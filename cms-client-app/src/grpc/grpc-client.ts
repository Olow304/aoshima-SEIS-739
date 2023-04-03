// // import {GrpcCmsServiceClient} from "@/proto/PageServiceServiceClientPb";
// // import {EmptyRequest, PageRequest} from "../proto/PageService_pb";
// // import * as grpcWeb from 'grpc-web';
// // import * as protoLoader from '@grpc/proto-loader';
// //
// // const SERVER_URL = "http://localhost:8080";
// // // const client = new GrpcCmsServiceClient(SERVER_URL);
// // //
// // // function callWithAuth(
// // //     methodFunc,
// // //     request,
// // //     metadata,
// // //     callback
// // // ) {
// // //     const token = localStorage.getItem("token");
// // //     if (token) {
// // //         metadata.authorization = token;
// // //     }
// // //     methodFunc(request, metadata, {}, callback);
// // // }
// // //
// // // function withAuthInterceptor(client, method, requestData, callback) {
// // //     console.log('In grpc-client.ts, line: 36 ', requestData);
// // //     console.log('In grpc-client.ts, line: 37 ', method);
// // //     console.log('In grpc-client.ts, line: 38 ', client);
// // //     const methodFunc = client[method].bind(client);
// // //     const metadata = {};
// // //     callWithAuth(methodFunc, requestData, metadata, callback);
// // // }
// //
// //
// // const PROTO_FILE_PATH = '/path/to/your/protobuf/file.proto';
// //
// // // Load the proto file and define the package and service names
// // const packageDefinition = protoLoader.loadSync(PROTO_FILE_PATH, {
// //     keepCase: true,
// //     longs: String,
// //     enums: String,
// //     defaults: true,
// //     oneofs: true
// // });
// //
// // const packageName = 'com.example.package';
// // const serviceName = 'GrpcCmsService';
// //
// // // Create a client using the proto file and package/service names
// // const cmsService = new GrpcCmsServiceClient(
// //     `http://${window.location.hostname}:${window.location.port}`,
// //     null,
// //     {
// //         transport: grpcWeb.ClientTransportFactory.createFromXHR(),
// //         unaryInterceptors: [authInterceptor] // Optional interceptor for authorization
// //     }
// // );
// //
// // export {client, withAuthInterceptor};
//
// import { EmptyRequest, PageRequest } from '../proto/PageService_pb';
// import { GrpcCmsServiceClient } from '@/proto/PageServiceServiceClientPb';
// import { grpc } from '@improbable-eng/grpc-web';
// import {InterceptingCall, loadPackageDefinition} from "@grpc/grpc-js";
//
// import * as protobuf from 'protobufjs';
//
// let protoFile;
// protobuf.load('./PageService.proto', (err, root) => {
//     if (err) throw err;
//     protoFile = root;
// });
//
//
// const CLIENT_HOST = 'http://localhost:8080';
// const PAGE_SERVICE = new GrpcCmsServiceClient(CLIENT_HOST, null, null);
//
// function authInterceptor(options: any, nextCall: any) {
//     return new InterceptingCall(nextCall(options), {
//         start: function (metadata, listener, next) {
//             const token = localStorage.getItem('token');
//             if (token) {
//                 metadata.add('authorization', token)
//             }
//             next(metadata, listener);
//         },
//     });
// }
//
// function withAuthInterceptor(method: any, requestData: any, callback: any) {
//     const methodDescriptor = PAGE_SERVICE[method];
//     const metadata = new grpc.Metadata();
//     const request = new methodDescriptor.requestType(requestData);
//
//     grpc.unary(methodDescriptor, {
//         request: request,
//         host: CLIENT_HOST,
//         metadata: metadata,
//         transport: grpc.WebsocketTransport(),
//         interceptors: [authInterceptor],
//         onEnd: (response) => {
//             if (response.status === grpc.Code.OK && response.message) {
//                 const responseMessage = response.message.toObject();
//                 callback(null, responseMessage);
//             } else {
//                 console.error(response.status);
//                 console.error(response.message);
//                 callback(response.status);
//             }
//         },
//     });
// }
//
// // Load the proto file
// const packageDefinition = protoFile;
// const protoDescriptor = loadPackageDefinition(packageDefinition);
//
// export function createPage(requestData: any, callback: any) {
//     withAuthInterceptor('createPage', requestData, callback);
// }
//
// export function updatePage(requestData: any, callback: any) {
//     withAuthInterceptor('updatePage', requestData, callback);
// }
//
// export function deletePage(requestData: any, callback: any) {
//     withAuthInterceptor('deletePage', requestData, callback);
// }
//
// export function getPage(requestData: any, callback: any) {
//     withAuthInterceptor('getPage', requestData, callback);
// }
//
// export function getAllPages(requestData: any, callback: any) {
//     withAuthInterceptor('getAllPages', requestData, callback);
// }
//
// export function validateEmail(requestData: any, callback: any) {
//     withAuthInterceptor('validateEmail', requestData, callback);
// }
//
// export { withAuthInterceptor };
//
//
