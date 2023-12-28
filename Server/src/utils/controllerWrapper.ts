import { NextFunction, Request, Response } from "express";

const controllerWrapper = (callback: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const data: any = await callback(req, res)

        res.locals.result = data // Se utiliza en el eventHandler
        // Para que no ingrese al middleware de rutas no encontrada
        res.locals.finished = true

        res.json(data)
        return next()
    }
}

export { controllerWrapper }