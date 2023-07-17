import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from "express";
import responseMessage from '../utils/responseMessage';
import { ApplicationError } from '../utils/applicationError';


const validateResults = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Valida los datos que se estan enviando y si no cumple con las condiciones
        // el .throw() forza que se vaya todo al catch
        validationResult(req).throw()
        next()
    } catch (error) {
        const errors = validationResult(req);
        const extractedErrors: any[] = []
        errors.array({ onlyFirstError: true })
            .map(err => extractedErrors.push({ [err.param]: err.msg }));
            
        return res.json(responseMessage.error<any>({
            message: 'Error en datos enviados', data: extractedErrors
        }))
    }
}

export { validateResults }