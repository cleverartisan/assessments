import { Request, Response } from 'express';

export type HandlerFnType = (request:Request, response:Response) => void;

export enum HttpMethod {
  Option = 'option',
  Get = 'get',
  Patch = 'patch',
  Post = 'post',
  Put = 'put',
  Del = 'del',
}