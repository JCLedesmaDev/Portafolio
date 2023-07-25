import multer from 'multer'
import { Request, Response, NextFunction } from "express";
import { ApplicationError } from '@utils/applicationError'
import responseMessage from '@utils/responseMessage';

interface INameFields {
    name: string;
    maxCount: number;
}

export const fileMulterHandler = (nameFields: INameFields[]) => {

    const storage = configureMulterStorage();
    const upload = multer({ storage: storage }).fields(nameFields)

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await new Promise((resolve, reject) => {
                upload(req, res, (error: any) => {
                    if (error instanceof multer.MulterError) {
                        reject(new ApplicationError({
                            message: 'Ocurrio un error al procesar los archivos. Intentelo nuevamente'
                        }))
                    } else if (error) {
                        reject(new ApplicationError({
                            message: 'Ocurrio un error desconocido al cargar el archivo'
                        }))
                    }
                    resolve(undefined);
                })
            })
            return next();
        } catch (error: any) {
            return res.json(responseMessage.error<any>({
                message: error.message
            }))
        }
    }
}

const configureMulterStorage = () => {
    return multer.diskStorage({
        destination: (
            req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void
        ) => {
            callback(null, `${__dirname}/../../public`);
        },
        filename: (
            req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void
        ) => {
            callback(null, `${Date.now()}-${file.originalname}`); //TODO 123123213232-pepito.pdf
        }
    });
}