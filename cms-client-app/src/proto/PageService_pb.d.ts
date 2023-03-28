import * as jspb from 'google-protobuf'



export class EmailRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): EmailRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmailRequest): EmailRequest.AsObject;
  static serializeBinaryToWriter(message: EmailRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailRequest;
  static deserializeBinaryFromReader(message: EmailRequest, reader: jspb.BinaryReader): EmailRequest;
}

export namespace EmailRequest {
  export type AsObject = {
    email: string,
  }
}

export class EmailResponse extends jspb.Message {
  getEmailexists(): boolean;
  setEmailexists(value: boolean): EmailResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmailResponse.AsObject;
  static toObject(includeInstance: boolean, msg: EmailResponse): EmailResponse.AsObject;
  static serializeBinaryToWriter(message: EmailResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmailResponse;
  static deserializeBinaryFromReader(message: EmailResponse, reader: jspb.BinaryReader): EmailResponse;
}

export namespace EmailResponse {
  export type AsObject = {
    emailexists: boolean,
  }
}

export class PageRequest extends jspb.Message {
  getId(): number;
  setId(value: number): PageRequest;

  getTitle(): string;
  setTitle(value: string): PageRequest;

  getContent(): string;
  setContent(value: string): PageRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PageRequest): PageRequest.AsObject;
  static serializeBinaryToWriter(message: PageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PageRequest;
  static deserializeBinaryFromReader(message: PageRequest, reader: jspb.BinaryReader): PageRequest;
}

export namespace PageRequest {
  export type AsObject = {
    id: number,
    title: string,
    content: string,
  }
}

export class PageResponse extends jspb.Message {
  getId(): number;
  setId(value: number): PageResponse;

  getTitle(): string;
  setTitle(value: string): PageResponse;

  getContent(): string;
  setContent(value: string): PageResponse;

  getPageview(): number;
  setPageview(value: number): PageResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PageResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PageResponse): PageResponse.AsObject;
  static serializeBinaryToWriter(message: PageResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PageResponse;
  static deserializeBinaryFromReader(message: PageResponse, reader: jspb.BinaryReader): PageResponse;
}

export namespace PageResponse {
  export type AsObject = {
    id: number,
    title: string,
    content: string,
    pageview: number,
  }
}

export class AllPagesResponse extends jspb.Message {
  getPagesList(): Array<PageResponse>;
  setPagesList(value: Array<PageResponse>): AllPagesResponse;
  clearPagesList(): AllPagesResponse;
  addPages(value?: PageResponse, index?: number): PageResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AllPagesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AllPagesResponse): AllPagesResponse.AsObject;
  static serializeBinaryToWriter(message: AllPagesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AllPagesResponse;
  static deserializeBinaryFromReader(message: AllPagesResponse, reader: jspb.BinaryReader): AllPagesResponse;
}

export namespace AllPagesResponse {
  export type AsObject = {
    pagesList: Array<PageResponse.AsObject>,
  }
}

export class EmptyRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmptyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmptyRequest): EmptyRequest.AsObject;
  static serializeBinaryToWriter(message: EmptyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmptyRequest;
  static deserializeBinaryFromReader(message: EmptyRequest, reader: jspb.BinaryReader): EmptyRequest;
}

export namespace EmptyRequest {
  export type AsObject = {
  }
}

