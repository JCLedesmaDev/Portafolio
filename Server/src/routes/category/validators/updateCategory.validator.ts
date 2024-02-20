import { validateResultsHandler } from "@middlewares/index.middlewares";
import { Request, Response, NextFunction } from "express";
import { body, param } from "express-validator";

export const validatorUpdateCaterogyRequest = [
    param('idCategory')
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    body('name', "Este campo es requerido")
        .optional()
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    (req: Request, res: Response, next: NextFunction) => validateResultsHandler(req, res, next)
]