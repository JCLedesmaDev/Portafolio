import { body } from 'express-validator'
import { Request, Response, NextFunction } from "express";
import { validateResults } from '@middlewares/validatorExpressHandler'


export const validatorUpdateUser = [

    body("fullName", "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    body("seniority", "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    body("aboutMe", "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    body("mySkills", "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    body("imageProfile", "Este campo es requerido")
        .exists() // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .isArray()
        .withMessage('Debe enviar UNA imagen de formato .png o .jpeg para el perfil.'),


    body("curriculumVitae", "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    (req: Request, res: Response, next: NextFunction) => validateResults(req, res, next)
]

// export const validatorUpdateUserPhoto = [
//     check("imageProfile", "Este campo es requerido")
//         .custom((value, { req }) => {
//             let flag = false

//             const file = req?.files['imageProfile'][0]?.originalname.split(".").pop();
//             if (file === 'png' || file === 'jpeg') {
//                 flag = true
//             } else {
//                 // TODO: Hacer que elimine el archivo que no cumple el formato
//                 // https://github.com/fazt/photo-gallery-api/blob/master/src/controllers/photo.controller.ts
//             }

//             return flag
//         })
//         .withMessage('Debe enviar UNA imagen de formato .png o .jpeg para el perfil.'),

//     (req: Request, res: Response, next: NextFunction) => validateResults(req, res, next)
// ]
