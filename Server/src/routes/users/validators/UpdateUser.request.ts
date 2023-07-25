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
        .exists() // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .withMessage('No se proporciono ninguna imagen')
        .trim() // Elimina los espacios del comienzo y final del texto
        .custom((value) => {
            if (typeof value != 'string') return false;
            const base64regex = /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+)?;base64,([a-zA-Z0-9+/=]+)$/;
            return base64regex.test(value);
        })
        .withMessage('El archivo no esta codificado en base64')
        .custom((value) => {
            if (/^data:image\/(png|jpeg);base64,/.test(value)) return true;
            return false;
        })
        .withMessage('Debe enviar UNA imagen de formato .png o .jpeg para el perfil.'),

    check("curriculumVitae", "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    (req: Request, res: Response, next: NextFunction) => validateResults(req, res, next)
]

// Ejemplo de si puese un arreglo de base64
// const images = [
//     { name: 'image1.png', data: 'base64-encoded-data-1' },
//     { name: 'image2.jpg', data: 'base64-encoded-data-2' },
//     // Agrega más imágenes al arreglo si es necesario
//   ];

//   body('images').exists().isArray().withMessage('No se han proporcionado imágenes válidas.'),
//   // Validar cada imagen en el arreglo
//   body('images.*.name').isString().withMessage('El nombre de la imagen debe ser una cadena de texto.'),
//   body('images.*.data').custom(isBase64).withMessage('El contenido de la imagen no está en formato base64.'),
