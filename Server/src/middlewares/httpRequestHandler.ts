import { NextFunction, Request, Response } from 'express'

const httpRequestHandler = (req: Request, res: Response, next: NextFunction) => {

    req.locals = {} as any

    const usrToken = (req.signedCookies['jwt']) ? req.signedCookies['jwt'].toString() : ''
    req.locals.usrToken = usrToken
   
    next()
}
export {
    httpRequestHandler
} 