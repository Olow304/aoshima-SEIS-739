/**
 * @fileoverview gRPC-Web generated client stub for pageservice
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.2
// 	protoc              v3.15.8
// source: PageService.proto


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as PageService_pb from './PageService_pb';


export class GrpcCmsServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname.replace(/\/+$/, '');
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorcreatePage = new grpcWeb.MethodDescriptor(
    '/pageservice.GrpcCmsService/createPage',
    grpcWeb.MethodType.UNARY,
    PageService_pb.PageRequest,
    PageService_pb.PageResponse,
    (request: PageService_pb.PageRequest) => {
      return request.serializeBinary();
    },
    PageService_pb.PageResponse.deserializeBinary
  );

  createPage(
    request: PageService_pb.PageRequest,
    metadata: grpcWeb.Metadata | null): Promise<PageService_pb.PageResponse>;

  createPage(
    request: PageService_pb.PageRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: PageService_pb.PageResponse) => void): grpcWeb.ClientReadableStream<PageService_pb.PageResponse>;

  createPage(
    request: PageService_pb.PageRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: PageService_pb.PageResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pageservice.GrpcCmsService/createPage',
        request,
        metadata || {},
        this.methodDescriptorcreatePage,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pageservice.GrpcCmsService/createPage',
    request,
    metadata || {},
    this.methodDescriptorcreatePage);
  }

  methodDescriptorupdatePage = new grpcWeb.MethodDescriptor(
    '/pageservice.GrpcCmsService/updatePage',
    grpcWeb.MethodType.UNARY,
    PageService_pb.PageRequest,
    PageService_pb.PageResponse,
    (request: PageService_pb.PageRequest) => {
      return request.serializeBinary();
    },
    PageService_pb.PageResponse.deserializeBinary
  );

  updatePage(
    request: PageService_pb.PageRequest,
    metadata: grpcWeb.Metadata | null): Promise<PageService_pb.PageResponse>;

  updatePage(
    request: PageService_pb.PageRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: PageService_pb.PageResponse) => void): grpcWeb.ClientReadableStream<PageService_pb.PageResponse>;

  updatePage(
    request: PageService_pb.PageRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: PageService_pb.PageResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pageservice.GrpcCmsService/updatePage',
        request,
        metadata || {},
        this.methodDescriptorupdatePage,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pageservice.GrpcCmsService/updatePage',
    request,
    metadata || {},
    this.methodDescriptorupdatePage);
  }

  methodDescriptordeletePage = new grpcWeb.MethodDescriptor(
    '/pageservice.GrpcCmsService/deletePage',
    grpcWeb.MethodType.UNARY,
    PageService_pb.PageRequest,
    PageService_pb.PageResponse,
    (request: PageService_pb.PageRequest) => {
      return request.serializeBinary();
    },
    PageService_pb.PageResponse.deserializeBinary
  );

  deletePage(
    request: PageService_pb.PageRequest,
    metadata: grpcWeb.Metadata | null): Promise<PageService_pb.PageResponse>;

  deletePage(
    request: PageService_pb.PageRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: PageService_pb.PageResponse) => void): grpcWeb.ClientReadableStream<PageService_pb.PageResponse>;

  deletePage(
    request: PageService_pb.PageRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: PageService_pb.PageResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pageservice.GrpcCmsService/deletePage',
        request,
        metadata || {},
        this.methodDescriptordeletePage,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pageservice.GrpcCmsService/deletePage',
    request,
    metadata || {},
    this.methodDescriptordeletePage);
  }

  methodDescriptorgetPage = new grpcWeb.MethodDescriptor(
    '/pageservice.GrpcCmsService/getPage',
    grpcWeb.MethodType.UNARY,
    PageService_pb.PageRequest,
    PageService_pb.PageResponse,
    (request: PageService_pb.PageRequest) => {
      return request.serializeBinary();
    },
    PageService_pb.PageResponse.deserializeBinary
  );

  getPage(
    request: PageService_pb.PageRequest,
    metadata: grpcWeb.Metadata | null): Promise<PageService_pb.PageResponse>;

  getPage(
    request: PageService_pb.PageRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: PageService_pb.PageResponse) => void): grpcWeb.ClientReadableStream<PageService_pb.PageResponse>;

  getPage(
    request: PageService_pb.PageRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: PageService_pb.PageResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pageservice.GrpcCmsService/getPage',
        request,
        metadata || {},
        this.methodDescriptorgetPage,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pageservice.GrpcCmsService/getPage',
    request,
    metadata || {},
    this.methodDescriptorgetPage);
  }

  methodDescriptorgetAllPages = new grpcWeb.MethodDescriptor(
    '/pageservice.GrpcCmsService/getAllPages',
    grpcWeb.MethodType.UNARY,
    PageService_pb.EmptyRequest,
    PageService_pb.AllPagesResponse,
    (request: PageService_pb.EmptyRequest) => {
      return request.serializeBinary();
    },
    PageService_pb.AllPagesResponse.deserializeBinary
  );

  getAllPages(
    request: PageService_pb.EmptyRequest,
    metadata: grpcWeb.Metadata | null): Promise<PageService_pb.AllPagesResponse>;

  getAllPages(
    request: PageService_pb.EmptyRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: PageService_pb.AllPagesResponse) => void): grpcWeb.ClientReadableStream<PageService_pb.AllPagesResponse>;

  getAllPages(
    request: PageService_pb.EmptyRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: PageService_pb.AllPagesResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pageservice.GrpcCmsService/getAllPages',
        request,
        metadata || {},
        this.methodDescriptorgetAllPages,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pageservice.GrpcCmsService/getAllPages',
    request,
    metadata || {},
    this.methodDescriptorgetAllPages);
  }

  methodDescriptorvalidateEmail = new grpcWeb.MethodDescriptor(
    '/pageservice.GrpcCmsService/validateEmail',
    grpcWeb.MethodType.UNARY,
    PageService_pb.EmailRequest,
    PageService_pb.EmailResponse,
    (request: PageService_pb.EmailRequest) => {
      return request.serializeBinary();
    },
    PageService_pb.EmailResponse.deserializeBinary
  );

  validateEmail(
    request: PageService_pb.EmailRequest,
    metadata: grpcWeb.Metadata | null): Promise<PageService_pb.EmailResponse>;

  validateEmail(
    request: PageService_pb.EmailRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: PageService_pb.EmailResponse) => void): grpcWeb.ClientReadableStream<PageService_pb.EmailResponse>;

  validateEmail(
    request: PageService_pb.EmailRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: PageService_pb.EmailResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/pageservice.GrpcCmsService/validateEmail',
        request,
        metadata || {},
        this.methodDescriptorvalidateEmail,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/pageservice.GrpcCmsService/validateEmail',
    request,
    metadata || {},
    this.methodDescriptorvalidateEmail);
  }

}

