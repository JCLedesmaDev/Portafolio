import { check } from 'express-validator'
import { Request, Response, NextFunction } from "express";
import { validateResults } from '@middlewares/validatorExpressHandler'


export const validatorUpdateUser = [

    check("fullName", "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    check("seniority", "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    check("aboutMe", "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    check("mySkills", "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    check("imageProfile", "Este campo es requerido")
        .custom((value, { req }) => {
            console.log("🚀 ~ file: UpdateUser.request.ts:30 ~ .custom ~ value:", value)
            // let flag = false

            // const file = req?.file?.originalname.split(".").pop();
            // if (req.file !== undefined && (file === 'png' || file === 'jpeg')) {
            //     flag = true
            // }
            // return flag
        })
        .withMessage('Debe enviar una imagen de formato .png o .jpeg para el perfil.'),

    check("curriculumVitae", "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    (req: Request, res: Response, next: NextFunction) => validateResults(req, res, next)
]