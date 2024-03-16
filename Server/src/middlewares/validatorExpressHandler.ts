import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from "express";
import { deleteFile, responseMessage } from "@utils/index.utils";


const validateResultsHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Valida los datos que se estan enviando y si no cumple con las condiciones
        // el .throw() forza que se vaya todo al catch
        validationResult(req).throw()
        return next()
    } catch (error) {
        const errors = validationResult(req);

        if (req.files) deleteFilesWhenExistError(req.files)

        let extractedErrors: any[] = []
        let errorMessage = 'Hay un error en los siguientes campos enviados: '

        errors.array({ onlyFirstError: true }).map(err => {
            extractedErrors.push({ [err.param]: err.msg })
            errorMessage += ` ${err.param};`
        });

        return res.json(responseMessage.error({
            message: errorMessage, data: extractedErrors
        }))
    }
}

export { validateResultsHandler }


const deleteFilesWhenExistError = (files: any[]) => {
    const arrFilesByFields: any[] = Object.values(files)
    const arrFilesGlobal = [].concat(...arrFilesByFields)

    arrFilesGlobal.forEach((filesGlobal: any) => {
        deleteFile(filesGlobal.filename)
    })
}