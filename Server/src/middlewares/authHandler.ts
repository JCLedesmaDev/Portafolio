import { request, response, Request, Response, NextFunction } from 'express'
import { ApplicationError } from '../utils/applicationError'
import jwt from '../utils/jwt'

const authHandler = (req: Request = request, res: Response = response, next: NextFunction) => {
    try {
        const usrToken =  req.locals.usrToken

        if (!usrToken) {
            throw new ApplicationError({message: 'No ha iniciado sesion!', status: 401})
        }

        const tokenData: any = jwt.verifyToken(usrToken)

        if (tokenData.id != req.locals.usrId) {
            throw new ApplicationError({message: 'Token no corresponde al usuario', status: 401})            
        }
        
        req.locals.usrRoles = tokenData.roles
        return next();
    } catch (error) {
        next(error)
    }
}


export { authHandler }