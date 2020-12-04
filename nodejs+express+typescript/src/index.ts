import bodyParser from 'body-parser';
import express, { Response, Request, NextFunction } from 'express';
import useGeneratedRoutes from './routes/index';
import errorMiddleware from './middleware/errors';
import HttpException from './types/exceptions';

const server = express();
const router = express.Router();
const port = 4433;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// configure endpoint requirements
// and group with the api endpoint constroller
useGeneratedRoutes(router);
server.use('/api', router);
// enable custom error response
server.use(errorMiddleware);

// note: security was not configured for this project,
// however, those hools for options + cors compliance
// could have been configured here as well.

// enable fall-through endpoint error handling.
server.use((request:Request, response:Response, next: NextFunction) => {
	response.status(404).json(Object.assign({}, new HttpException(404, 'Path not found or allowed'), {
		path: request.url,
	}));
});

const serverRef = server.listen(process.env.API_PORT || port, () => {
	/* eslint-disable no-console */
	console.log('Fiserv node-test online.\nListening on port', port);
});

// shutdownServer:
// allow for the server to close gracefully,
// specifically within the context of mocha unit test.
export const shutdownServer = () => {
	serverRef.close();
}

export default server;
