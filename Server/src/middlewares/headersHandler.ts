import { NextFunction, Request, Response } from 'express'

const headersHandler = (req: Request, res: Response, next: NextFunction) => {

    req.locals = {} as any

    const usrToken = (req.headers['authorization']) ? req.headers['authorization'].toString() : ''
    req.locals.usrToken = usrToken

    const usrId = (req.headers['userid']) ? req.headers['userid'].toString() : ''
    req.locals.usrId = usrId
    
    next()
}
export {
    headersHandler
} 