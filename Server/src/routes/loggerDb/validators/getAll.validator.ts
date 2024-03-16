import { validateResultsHandler } from "@middlewares/index.middlewares";
import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const getAllLogerDbRequest = [
    body('page')
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty() // No puede venir vacio
        .isNumeric(),

    body('limitPage')
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty() // No puede venir vacio
        .isNumeric(),

    body('dateFrom')
        .isISO8601() // Valida las fechas y las horas
        .trim(), // Elimina los espacios del comienzo y final del texto

    body('dateUntil')
        .isISO8601() // Valida las fechas y las horas
        .trim(), // Elimina los espacios del comienzo y final del texto

    body('typeEvent')
        .isString()
        .trim(), // Elimina los espacios del comienzo y final del texto

    body('userId')
        .optional({ checkFalsy: true })
        .trim() // Elimina los espacios del comienzo y final del texto
        .isMongoId(),

    (req: Request, res: Response, next: NextFunction) => validateResultsHandler(req, res, next)
]