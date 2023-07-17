import { check } from 'express-validator'
import { validateResults } from '../../../middlewares/validatorExpressHandler'
import { Request, Response, NextFunction } from "express";

export const validatorLogin = [
    check("email", "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty() // No puede venir vacio
        .isEmail()
        .withMessage("El campo debe ser de tipo email"),

    check("password", "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty() // No puede venir vacio
        .isLength({ min: 3, max: 20 })
        .withMessage('El campo debe tener entre 3 a 20 caracteres'),

    (req: Request, res: Response, next: NextFunction) => validateResults(req, res, next)
]