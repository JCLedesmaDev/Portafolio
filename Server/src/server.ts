import express, { Express } from 'express';
import cors from 'cors';
import logger from 'morgan'
import config from 'config'
import indexRoutes from './routes/index.routes'
import { headersHandler } from './middlewares/headersHandler';
import { errorHandler } from './middlewares/errorHandler';
import { eventHandler } from './middlewares/eventHandler';
import { notFoundRouterHandler } from './middlewares/notFoundRouteHandler';
import { createMocksDateHandler } from './utils/createMocksDate';

 function startServer(connectionServer: string) {

    const app: Express = express();

    app.use(logger(config.get('logger')))
    app.use(express.json()) //--> Comprende mensajes JSON
    app.use(cors({ origin: '*' }));

    app.listen(config.get('server.port'), async () => {
        await createMocksDateHandler()
        console.log(`⚡️[server]: Server is running in ${connectionServer}`);
    });

    app.use(headersHandler) // Definimos como manejamos todos los datos provenientes del headers

    app.use('/api', indexRoutes)
    app.use("*", notFoundRouterHandler);

    app.use(eventHandler)
    app.use(errorHandler)
}


export default {
    startServer
}