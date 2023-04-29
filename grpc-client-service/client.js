const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = "proto/PageService.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const protoDesc = grpc.loadPackageDefinition(packageDefinition);

const metadata = new grpc.Metadata();

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

//const client = new protoDesc.analyticservice.AnalyticService('localhost:9090', grpc.credentials.createInsecure(), { interceptors: [authInterceptor] });
const client = new protoDesc.pageservice.GrpcCmsService('localhost:9090', grpc.credentials.createInsecure(), { interceptors: [authInterceptor] });

// get all pages
function getAllPages(token) {
    return new Promise((resolve, reject) => {
        client.getAllPages({}, { token }, (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
}

function createPage(title, content, token) {
    return new Promise((resolve, reject) => {
        const pageRequest = {
            title: title,
            content: content,
        };
        client.createPage(pageRequest, { token }, (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
}

function updatePage(id, title, content, token) {
    return new Promise((resolve, reject) => {
        const pageRequest = {
            id: id,
            title: title,
            content: content,
        };
        client.updatePage(pageRequest, { token }, (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
}

function deletePage(id, token) {
    return new Promise((resolve, reject) => {
        const pageRequest = {
            id: id,
        };
        client.deletePage(pageRequest, { token }, (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
}

module.exports = {
    createPage,
    updatePage,
    deletePage,
    getAllPages,
}