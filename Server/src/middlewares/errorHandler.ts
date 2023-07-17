import { Request, Response, NextFunction } from 'express'
import responseMessage from '../utils/responseMessage'
import logger from '../services/loggerBD'
import { ApplicationError } from '../utils/applicationError'

const errorHandler = async (err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
    const requestInfo = {
        headers: req.headers,
        body: req.locals?.info,
        params: req.params,
        url: req.url
    }
    const responseInfo = {
        ...err,
        stack: err.stack
    }    
    try {
        console.log("🚀 ---------------------------------------------------")
        console.log("🚀 ~ file: errorHandler.ts:8 ~ errorHandler ~ err", err)
        console.log("🚀 ---------------------------------------------------")

        if (err.source) { // Solo mandara registro a la BD, cuando sea un error proveniente de la asincronia
            await logger.insertLoggerDB({
                usuarioId: req.locals.usrId as string,
                tipo: 'Error',
                request: requestInfo,
                response: responseInfo
            })
        }
        return res.status(err.status).json(
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
        res.status(500).json(responseMessage.error<any>({
            message: 'Ocurrio un error interno. En breve estara resuelto'
        }))
        return await logger.insertLoggerDB({
            usuarioId: req.locals.usrId as string,  
            tipo: 'Error',
            request: requestInfo,
            response: errorInfo
        })
    }
}

export { errorHandler }