import { check } from 'express-validator'
import { Request, Response, NextFunction } from "express";
import { validateResults } from '@middlewares/validatorExpressHandler'


export const validatorUpdateUserPhoto = [
    check("imageProfile", "Este campo es requerido")
        .custom((value, { req }) => {
            let flag = false

            const file = req?.files['imageProfile'][0]?.originalname.split(".").pop();
            if (file === 'png' || file === 'jpeg') {
                flag = true
            } else {
                // TODO: Hacer que elimine el archivo que no cumple el formato
                // https://github.com/fazt/photo-gallery-api/blob/master/src/controllers/photo.controller.ts
            }

            return flag
        })
        .withMessage('Debe enviar UNA imagen de formato .png o .jpeg para el perfil.'),

    (req: Request, res: Response, next: NextFunction) => validateResults(req, res, next)
]