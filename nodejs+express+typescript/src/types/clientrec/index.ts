import { Request, Response } from 'express';

export const ClientRecParserRegExp:RegExp = /^([A-Z]+0{4})([A-Z]+0{3})([9]+)([1-8]+)$/gm;

export interface IPayload {
  data: string;
}

export interface IDataParser {
  parse(request: Request<import("express-serve-static-core").ParamsDictionary>, response: Response): void
}

export interface IClientRec {
  firstName: string,
  lastName: string,
  clientId: string[]|string,
  trimPadding(): void,
  toClientRec(delim:string): IClientRec;
}

export interface IParserResponse {
  statusCode: number,
  data: IClientRec,
}

// ClientRec(IClientRec)
// Provides a structure for validating user
// input from known api requests.
export class ClientRec implements IClientRec {
  firstName: string;
  lastName: string;
  clientId: string[]|string;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.clientId = [];
  }

  public trimPadding(): void {
    const scrub:(str:string) => string = (str:string) => {
      if (str) {
        return str.replace(/0+$/, '');
      }
      return str;
    }

    this.firstName = scrub(this.firstName);
    this.lastName = scrub(this.lastName);
  }

  public toClientRec( delim:string='' ): IClientRec {
    return Object.assign({}, this, {
      clientId: (this.clientId as string[]).join(delim)
    });
  }
}
