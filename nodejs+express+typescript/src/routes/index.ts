import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import { IEndpoint } from '../types/endpoints';
import { HttpMethod } from '../types';
import validationMiddleware from '../middleware/validation';
import ParseDataPostDto from '../types/dto/parse-data.dto';
import HttpException from '../types/exceptions';

// walkSync:Function
// Peforms a recursive search for endpoint definitions
// within the routes directory.
const walkSync = (dir:string, filelist:string[]=[]) => {
  fs.readdirSync(dir).forEach(file => {
    if (file === '.DS_Store') return;

    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist;
};

// useGeneratedRoutes:Function
// This function generates the discovered route configurations
// defined within the routes directory.
const resourcePaths = walkSync(__dirname);
const useGeneratedRoutes = ( router:Router ) => {
  resourcePaths.forEach((resourcePath) => {
    if ((resourcePath.indexOf(__filename)===-1) &&
        (resourcePath.indexOf('.map')===-1)) {
      import(resourcePath)
        .then((resource) => {
          resource.default.routes.forEach(( route: IEndpoint ) => {
            switch(route.getMethod()) {
              case HttpMethod.Post:
                router.post(route.getPath(), validationMiddleware(ParseDataPostDto), route.getHandler());
                break;

              default:
                throw new HttpException(500, 'Internal Server Error - Route['+route.httpMethod+']: '+route.uri+', not supported');
            }
          })
        })
        .catch((error:HttpException) => {
          console.log(error);
        })
    }
  });
}

export default useGeneratedRoutes;