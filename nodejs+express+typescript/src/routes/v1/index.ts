import { Request, Response } from 'express';
import { IEndpointRoutes, Endpoint } from '../../types/endpoints';
import { HttpMethod } from '../../types'
import DataParsers from '../../controllers/parsers';

const VersionOneRoutes:IEndpointRoutes = {
  routes: [],
};

// Response|Request Handler(Endpoint -- /v1/parse)
const versionOneParseHandler = new Endpoint();
versionOneParseHandler.setMethod(HttpMethod.Post);
versionOneParseHandler.setPath('/v1/parse');
versionOneParseHandler.setHandler((request:Request, response:Response) => {
  DataParsers.parser.parse(request, response);
})

VersionOneRoutes.routes.push(versionOneParseHandler);

export default VersionOneRoutes;