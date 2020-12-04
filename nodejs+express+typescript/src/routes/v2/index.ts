import { Request, Response } from 'express';
import { IEndpointRoutes, Endpoint } from '../../types/endpoints';
import { HttpMethod } from '../../types'
import DataParsers from '../../controllers/parsers/v2';

const VersionTwoRoutes:IEndpointRoutes = {
  routes: [],
};

// Response|Request Handler(Endpoint -- /v2/parse)
const versionTwoParseHandler = new Endpoint();
versionTwoParseHandler.setMethod(HttpMethod.Post);
versionTwoParseHandler.setPath('/v2/parse');
versionTwoParseHandler.setHandler((request:Request, response:Response) => {
  DataParsers.parser.parse(request, response);
})

VersionTwoRoutes.routes.push(versionTwoParseHandler);

export default VersionTwoRoutes;