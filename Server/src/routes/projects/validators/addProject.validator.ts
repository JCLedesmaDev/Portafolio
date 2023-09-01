import { IFileRequest } from "@interface/IFileRequest";
import { validateResults } from "@middlewares/validatorExpressHandler";
import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const validatorAddProjectRequest = [
    body('name', "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    body('description', "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    body('details', "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    body('periodTimeFrom', "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .isNumeric() // Tiene que ser un dateTiem converitod en numerico/segundos
        .notEmpty(), // No puede venir vacio

    body('periodTimeTo', "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .isNumeric() // Tiene que ser un dateTiem converitod en numerico/segundos 
        .notEmpty(), // No puede venir vacio

    body('typeProject', "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    body('repositoryLink', "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    body('projectLink', "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    body("images")
        .optional()
        .custom((value) => {
            let flag = false
            for (const img of value as IFileRequest[]) {
                const file = img?.originalname.split(".").pop();
                if (file === 'png' || file === 'jpeg' || file === 'jpg') flag = true
                if (!flag) break;
            }
            return flag
        })
        .withMessage('Debe enviar TODAS las imagenes en formato .png o .jpeg o jpg.'),

    (req: Request, res: Response, next: NextFunction) => validateResults(req, res, next)
]