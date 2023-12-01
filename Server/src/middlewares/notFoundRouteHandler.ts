import { NextFunction, Request, Response } from 'express'
import { ApplicationError } from '@utils/applicationError'


const notFoundRouterHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!res.locals.finished) {
            throw new ApplicationError({
                message: `No se encontro: Metodo: ${req.method} - Ruta de servidor: ${req.baseUrl}.`
            })
        }
        return next()
    } catch (error) {
        return next(error)
    }
}

export { notFoundRouterHandler }