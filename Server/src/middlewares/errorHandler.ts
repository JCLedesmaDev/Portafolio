import { Request, Response, NextFunction } from 'express'
import logger from '@services/loggerDb'
import responseMessage from '@utils/responseMessage'
import { ApplicationError } from '@utils/applicationError'

const errorHandler = async (err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
    const requestInfo = {
        headers: req.headers,
        body: req.locals?.info,
        params: req.params,
    }
    const responseInfo = {
        ...err,
        stack: err.stack
    }
    try {
        console.log("🚀 ---------------------------------------------------")
        console.log("🚀 ~ file: errorHandler.ts:8 ~ errorHandler ~ err", err)
        console.log("🚀 ---------------------------------------------------")

        if (err.source) {
            // Solo mandara registro a la BD, cuando sea un error proveniente de la asincronia
            await logger.insertLoggerDb({
                usrId: req.locals.usrId as string,
                type: 'Error',
                url: req.url,
                method: req.method,
                request: requestInfo,
                response: responseInfo
            })
        }
        res.status(err.status).json(
            responseMessage.error<any>({ message: err.message })
        )
    } catch (error: any) {
        const errorInfo = {
            errInitial: responseInfo,
            errSecundary: {
                ...error,
                stack: error.stack
            }
        }
        try {
            await logger.insertLoggerDb({
                usrId: req.locals.usrId as string,
                type: 'Error',
                url: req.url,
                method: req.method,
                request: requestInfo,
                response: errorInfo
            })
        } catch (error) {
            console.log("🚀~ errorHandler ~ error:", error)
        }
        res.status(500).json(responseMessage.error({
            message: 'Ocurrio un error interno. En breve estara resuelto'
        }))
    }
}

export { errorHandler }