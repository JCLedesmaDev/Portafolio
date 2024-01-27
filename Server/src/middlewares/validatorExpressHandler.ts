import { Request, Response, NextFunction } from "express";
import responseMessage from '@utils/responseMessage';
import { Result, ValidationError, validationResult } from 'express-validator'
import { deleteFile } from "@utils/deleteFile";


const validateResults = (req: Request, res: Response, next: NextFunction) => {
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

export { validateResults }


const deleteFilesWhenExistError = (files: any[]) => {
    const arrFilesByFields: any[] = Object.values(files)
    const arrFilesGlobal = [].concat(...arrFilesByFields)

    arrFilesGlobal.forEach((filesGlobal: any) => {
        deleteFile(filesGlobal.filename)
    })
}

const mapperErrorsFields = (errors: Result<ValidationError>) => {
    let extractedErrors: any[] = []
    errors.array({ onlyFirstError: true }).map(err => {
        extractedErrors.push({ [err.param]: err.msg })
    });
    return extractedErrors
}