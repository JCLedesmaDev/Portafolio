
import { NextFunction, Request, Response } from 'express'
import logger from '@services/loggerDb'

const eventHandler = async (req: Request, res: Response, next: NextFunction) => {
    const requestInfo = {
        headers: req.headers,
        body: req.locals.info,
        params: req.params,
    }

    if (req.locals.notLogs) return next()

    logger.insertLoggerDb({
        usrId: req.locals.usrId as string,
        type: 'Evento',
        url: req.url,
        method: req.method,
        request: requestInfo,
        response: res.locals.result
    })

    return next()
}

export { eventHandler } 
