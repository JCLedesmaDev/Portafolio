
import { NextFunction, Request, Response } from 'express'
import logger from '@services/loggerDb'

const eventHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requestInfo = {
            headers: req.headers,
            body: req.locals.info,
            params: req.params,
        }

        if (req.locals.notLogs) return next()

        await logger.insertLoggerDb({
            usrId: req.locals.usrId as string,
            method: req.method,
            url: req.url,
            type: 'Evento',
            request: requestInfo,
            response: res.locals.result
        })

        return next()
    } catch (error) {
        return next(error)
    }
}

export { eventHandler } 
