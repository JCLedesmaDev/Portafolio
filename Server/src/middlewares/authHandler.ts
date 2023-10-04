import { request, response, Request, Response, NextFunction } from 'express'
import { ApplicationError } from '@utils/applicationError'
import jwt from '@utils/jwt'

const authHandler = (req: Request = request, res: Response = response, next: NextFunction) => {
    try {
        const usrToken = req.locals.usrToken

        if (!usrToken) {
            throw new ApplicationError({ 
                message: 'No ha iniciado sesion!', 
                status: 401 
            })
        }

        const tokenData: any = jwt.verifyToken(usrToken)

        if (req.headers["user-agent"] !== tokenData.userAgent) {
            throw new ApplicationError({
                message: 'Hemos detectado que estas ingresando un token diferente al de su origen.',
                status: 401
            })
        }

        if (req.socket.remoteAddress !== tokenData.remoteAddress) {
            throw new ApplicationError({
                message: 'Hemos detectado que estas ingresando un token diferente al de su origen.',
                status: 401
            })
        }

        req.locals.usrId = tokenData.id.toString()

        return next();
    } catch (error) {
        return next(error)
    }
}


export { authHandler }