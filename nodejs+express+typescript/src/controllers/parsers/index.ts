import { Request, Response } from 'express';
import { IDataParser, IClientRec, IPayload, ClientRec, ClientRecParserRegExp } from '../../types/clientrec'

// VersionOneParser(IDataParser)
// A tokenizer that utilizes a regular express to extract a given
// string format that uses a sequence of zeros(0's) to pad
// struct elements. The parse does not assume any constraints
// on the length of the parameters and strictly looks for the
// zero(0) padding character.
export class VersionOneParser implements IDataParser {
  protected helper(pattern:RegExp, data:string): IClientRec {
    let matches:any = pattern.exec(data);
    const parsedData:IClientRec = new ClientRec();

    while (matches !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (matches.index === pattern.lastIndex) {
        pattern.lastIndex++;
      }

      // The result can be accessed through the `m`-variable.
      const clid:string[] = [];
      matches.forEach((match:any, groupIndex:number) => {
        switch(groupIndex) {
          case 0: break;
          case 1: parsedData.firstName = match; break;
          case 2: parsedData.lastName = match; break;
          default: clid.push(match); break;
        }
      });

      parsedData.clientId = clid;

      matches = pattern.exec(data);
    }

    return parsedData;
  }

  public parse(request: Request<import("express-serve-static-core").ParamsDictionary>, response: Response): void {
    const payload:IPayload = (request.body as IPayload);
    const clientRec:IClientRec = this.helper(ClientRecParserRegExp, payload.data);

    response.status(200).send({
      statusCode: 200,
      data: clientRec.toClientRec(''),
    })
  }
}

export default {
  parser: new VersionOneParser()
}