import { ApplicationError, jwt } from '@utils/index.utils'
import { Request, Response, NextFunction } from 'express'

const authHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        const usrToken = req.locals.usrToken

        if (!usrToken || !req.signedCookies?.infoUsr) {
            throw new ApplicationError({
                message: 'Cookie ha expirado. Por favor, inicia sesión de nuevo.',
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

        if (req.signedCookies['infoUsr'] !== tokenData.id.toString()) {
            throw new ApplicationError({
                message: 'Token no corresponde al usuario',
                status: 401
            })
        }

        req.locals.usrId = tokenData.id.toString()

        return next();
    } catch (error) {
        res.clearCookie('jwt')
        res.clearCookie('infoUsr')
        return next(error)
    }
}


export { authHandler }