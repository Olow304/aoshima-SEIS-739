const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = protoLoader.loadSync("Analytics.proto")
const protoDesc = grpc.loadPackageDefinition(PROTO_PATH);

const metadata = new grpc.Metadata();
metadata.add('authorization', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvbG93IiwiZW1haWwiOiJvbG93QGdtYWlsLmNvbSIsImlhdCI6MTY3OTM1ODA2NywiZXhwIjoxNjc5Mzk0MDY3fQ.623rJmjuROaGK5KnsPjrfHQ0A6ZuIip4rF4lKpXrwHI');

const authInterceptor = function(options, nextCall) {
    return new grpc.InterceptingCall(nextCall(options), {
        start: function(metadata, listener, next) {
            metadata.add('authorization', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvbG93IiwiZW1haWwiOiJvbG93QGdtYWlsLmNvbSIsImlhdCI6MTY3OTM1ODA2NywiZXhwIjoxNjc5Mzk0MDY3fQ.623rJmjuROaGK5KnsPjrfHQ0A6ZuIip4rF4lKpXrwHI');
            next(metadata, listener);
        }
    });
};

const client = new protoDesc.analyticservice.AnalyticService('localhost:9090', grpc.credentials.createInsecure(), { interceptors: [authInterceptor] });

client.getPostCount({}, (err, response) => {
    console.log(response);
});
