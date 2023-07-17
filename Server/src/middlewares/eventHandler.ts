
import { NextFunction, Request, Response } from 'express'
import logger from '../services/loggerBD'

const eventHandler = async (req: Request, res: Response, next: NextFunction) => {

    const requestInfo = {
        headers: req.headers,
        body: req.locals.info,
        params: req.params,
        url: req.url
    }

    await logger.insertLoggerDB({
        usuarioId: req.locals.usrId as string, 
        tipo: 'Evento',
        request: requestInfo,
        response: req.locals.result
    })

    return next()
}

export { eventHandler } 
