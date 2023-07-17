import { check } from 'express-validator'
import { validateResults } from '../../../middlewares/validatorExpressHandler'
import { Request, Response, NextFunction } from "express";


export const validatorCreateFigurine = [
    check("idAlbum", "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    check("title", "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty() // No puede venir vacio
        .isLength({ min: 3, max: 15 })
        .withMessage('El campo debe tener entre 3 a 15 caracteres'),


    check("image", "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    (req: Request, res: Response, next: NextFunction) => validateResults(req, res, next)
]