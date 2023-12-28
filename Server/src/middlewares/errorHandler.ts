import { Request, Response, NextFunction } from 'express'
import logger from '@services/loggerDb'
import responseMessage from '@utils/responseMessage'
import { ApplicationError } from '@utils/applicationError'

const errorHandler = async (
    err: ApplicationError, req: Request,
    res: Response, next: NextFunction) => {

    const requestInfo = {
        headers: req.headers,
        body: req.locals?.info,
        params: req.params,
    }
    const responseInfo = { ...err, stack: err.stack }

    console.log("🚀 ---------------------------------------------------")
    console.log("🚀 ~ file: errorHandler.ts:8 ~ errorHandler ~ err", err)
    console.log("🚀 ---------------------------------------------------")

    if (err.source) {
        // Solo mandara registro a la BD, cuando sea un error proveniente de la asincronia
        logger.insertLoggerDb({
            usrId: req.locals.usrId as string,
            type: 'Error',
            url: req.url,
            method: req.method,
            request: requestInfo,
            response: responseInfo
        })
    }
    res.status(err.status || 500).json(
        responseMessage.error({ message: err.message })
    )

    return next()
}

export { errorHandler }