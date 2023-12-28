import 'express-async-errors';

import express, { Express } from 'express';
import 'module-alias/register';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import logger from 'morgan'
import config from 'config'
import indexRoutes from './routes/index.routes'
import { httpRequestHandler } from './middlewares/httpRequestHandler';
import { errorHandler } from './middlewares/errorHandler';
import { eventHandler } from './middlewares/eventHandler';
import { notFoundRouterHandler } from './middlewares/notFoundRouteHandler';
import { createMocksDateHandler } from './utils/createMocksDate';

function startServer (connectionServer: string) {

    const app: Express = express();

    app.use(logger(config.get('logger')))
    app.use(express.json()) //--> Comprende mensajes JSON
    app.use(express.static('public')) // -> Acceso publico a archivos subidos con Multer

    // Configuración del middleware de manejo de cookies con su clave secreta para firmar cookies. 
    app.use(cookieParser(config.get('cookie_secret')))

    app.use(cors({
        //origin: 'http://127.0.0.1:5173', // Permite todos los dominios
        origin: 'http://localhost:5173', // Permite todos los dominios
        // origin: '*', // Permite todos los dominios
        methods: 'GET,PUT,POST,DELETE',
        credentials: true // Habilita el envío de cookies en las solicitudes CORS
    }));

    app.listen(config.get('server.port'), async () => {
        await createMocksDateHandler()
        console.log(`⚡️[server]: Server is running in ${connectionServer}`);
    });

    app.use(httpRequestHandler) // Definimos como manejamos todos los datos provenientes del http request. 

    app.use('/api', indexRoutes)
    app.use("*", notFoundRouterHandler);

    app.use(eventHandler)
    app.use(errorHandler)
}


export default { startServer }