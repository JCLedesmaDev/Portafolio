
import { NextFunction, Request, Response } from 'express'
import logger from '@services/loggerDb'

const eventHandler = async (req: Request, res: Response, next: NextFunction) => {

    const requestInfo = {
        headers: req.headers,
        body: req.locals.info,
        params: req.params,
        url: req.url,
        method: req.method
    }

    if (req.method === 'GET') return next()

    await logger.insertLoggerDb({
        usrId: req.locals.usrId as string,
        type: 'Evento',
        request: requestInfo,
        response: res.locals.result
    })

    return next()
}

export { eventHandler } 
