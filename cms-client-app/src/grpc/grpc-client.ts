import { GrpcCmsServiceClient } from "../proto/PageServiceServiceClientPb";
import { EmptyRequest, PageRequest } from "../proto/PageService_pb";

const SERVER_URL = "http://localhost:8080";

const client = new GrpcCmsServiceClient(SERVER_URL);

console.log('In grpc-client.ts, line: 8 ', client);

function withAuthInterceptor(client, method, requestData, callback) {
    const token = localStorage.getItem("token");
    if (!token) {
        callback(new Error("Token not found in localStorage"), null);
        return;
    }
    const metadata = { authorization: `Bearer ${token}` };
    client[method](requestData, metadata, {}, callback);
}

export { client, withAuthInterceptor };
