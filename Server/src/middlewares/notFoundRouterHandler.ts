import { NextFunction, Request, Response } from 'express'
import { ApplicationError } from '@utils/index.utils'


const notFoundRouterHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.finished) {
        throw new ApplicationError({
            message: `No se encontro: Metodo: ${req.method} - Ruta de servidor: ${req.baseUrl}.`
        })
    }
    return next()
}

export { notFoundRouterHandler }