import { Request, Response } from 'express';
import { IDataParser, IClientRec, IPayload, ClientRecParserRegExp } from '../../../types/clientrec';
import { VersionOneParser } from '..';

// VersionTwoParser(IDataParser)
// An extension of the original VersionOneParser that introduces formating
// for the data collected from the base parser.
// --
// This class takes advantage of utility functions exposed via the IClientRec
// interface to remove padding from the name segments and puts the
// client id into a the desired display format.
export class VersionTwoParser extends VersionOneParser implements IDataParser {
  constructor() {
    super();
  }

  protected helper(pattern:RegExp, data:string): IClientRec {
    const clientRec:IClientRec = super.helper(pattern, data);
    clientRec.trimPadding();
    return clientRec;
  }

  public parse(request: Request<import("express-serve-static-core").ParamsDictionary>, response: Response): void {
    const payload:IPayload = (request.body as IPayload);
    const clientRec:IClientRec = this.helper(ClientRecParserRegExp, payload.data);

    response.status(200).send({
      statusCode: 200,
      data: clientRec.toClientRec('-'),
    });
  }
}

export default {
  parser: new VersionTwoParser()
}