import { body } from 'express-validator'
import { validateResultsHandler } from '@middlewares/index.middlewares'
import { Request, Response, NextFunction } from "express";

export const validatorLoginRequest = [
    body("email", "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty()
        .withMessage('El campo email, no puede venir vacio')
        .isEmail()
        .normalizeEmail()
        .withMessage("El campo debe ser de tipo email"),

    body("password", "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty() // No puede venir vacio
        .withMessage('El campo password, no puede venir vacio')
        .isLength({ min: 3, max: 20 })
        .withMessage('El campo debe tener entre 3 a 20 caracteres'),

    (req: Request, res: Response, next: NextFunction) => validateResultsHandler(req, res, next)
]