const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = "Analytics.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const protoDesc = grpc.loadPackageDefinition(packageDefinition);


const metadata = new grpc.Metadata();
metadata.add('authorization', 'token');

const authInterceptor = function (options, nextCall) {
    return new grpc.InterceptingCall(nextCall(options), {
        start: function (metadata, listener, next) {
            if (options.token) {
                metadata.add('authorization', options.token);
            }
            next(metadata, listener);
        },
    });
};

const client = new protoDesc.analyticservice.AnalyticService('localhost:9090', grpc.credentials.createInsecure(), { interceptors: [authInterceptor] });

function getPostCount(token) {
    return new Promise((resolve, reject) => {
        // here we are calling grpc 'getPostCount' method that's defined in our proto file and implemented in our server in Java
        // how amazing is that? we can call a method implemented in Java from NodeJS!
        client.getPostCount({}, { token }, (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response.count);
            }
        });
    });
}

function getPostViews(post_id, token) {
    return new Promise((resolve, reject) => {
        // here we are calling grpc 'getPostViews' method that's defined in our proto file and implemented in our server in Java
        client.getPostViews({ post_id }, { token }, (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response.views);
            }
        });
    });
}

module.exports = {
    getPostCount,
    getPostViews,
};