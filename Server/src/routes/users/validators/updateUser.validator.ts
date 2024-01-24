import { body } from 'express-validator'
import { Request, Response, NextFunction } from "express";
import { validateResults } from '@middlewares/validatorExpressHandler'


export const validatorUpdateUserRequest = [

    body("fullName", "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    body("rol", "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    body("aboutMe", "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    body("mySoftSkills", "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    body("imageProfile")
        .optional()
        .custom((value) => {
            let flag = false
            const file = value[0]?.originalname.split(".").pop();
            if (file === 'png' || file === 'jpeg' || file === 'jpg') flag = true
            return flag
        })
        .withMessage('Debe enviar UNA imagen de formato .png o .jpeg para el perfil.'),

    body("curriculumVitae", "Este campo es requerido")
        .optional()
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    (req: Request, res: Response, next: NextFunction) => validateResults(req, res, next)
]
