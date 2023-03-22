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
        client.getPostCount({}, { token }, (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response.count);
            }
        });
    });
}

function getPostViews(postId, token) {
    return new Promise((resolve, reject) => {
        // const request = new protoDesc.analyticservice.GetPostViewsRequest();
        // request.setPostId(postId);

        client.GetPostViews({post_id: postId}, { token }, (error, response) => {
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