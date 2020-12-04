import { Request, Response } from 'express';
import { HttpMethod, HandlerFnType } from '..';

export interface IEndpointRoutes {
  routes: IEndpoint[]
}

export interface IEndpoint {
  httpMethod: HttpMethod,
  uri: string,
  handler?: HandlerFnType,

  setHandler( handlerFn:HandlerFnType ): void,
  getHandler(): HandlerFnType,

  setPath( uri:string ): void,
  getPath(): string,

  setMethod( httpMethod:HttpMethod ): void,
  getMethod(): HttpMethod,
}

const defaultHandler = (request:Request, response:Response):void => {
  throw new Error("Method not implimented.");
}

// Endpoint(IEndpoint)
// Provides a generic interface for managing endpoints
export class Endpoint implements IEndpoint {
  httpMethod: HttpMethod;
  uri: string;
  handler: HandlerFnType;

  constructor() {
    this.httpMethod = HttpMethod.Get;
    this.uri = '/';
    this.handler = defaultHandler;
  }

  setHandler(handlerFn: HandlerFnType): void {
    this.handler = handlerFn;
  }
  getHandler(): HandlerFnType {
    return this.handler;
  }
  setPath(uri: string): void {
    this.uri = uri;
  }
  getPath(): string {
    return this.uri;
  }
  setMethod(httpMethod: HttpMethod): void {
    this.httpMethod = httpMethod;
  }
  getMethod(): HttpMethod {
    return this.httpMethod;
  }
}
