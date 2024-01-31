import multer from 'multer'
import { Request, Response, NextFunction } from "express";
import { ApplicationError } from '@utils/applicationError'
import responseMessage from '@utils/responseMessage';

interface INameFields {
    name: string;
    maxCount: number;
}

export const fileMulterHandler = (nameFields: INameFields[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const upload = configureMulterStorage().fields(nameFields)

            await new Promise((resolve, reject) => {
                upload(req, res, (error: any) => {
                    if (error instanceof multer.MulterError) {
                        reject(new ApplicationError({
                            message: `Ocurrio un error, se recibieron archivos inesperados. Intentelo nuevamente`
                        }))
                    } else if (error) {
                        reject(new ApplicationError({
                            message: 'Ocurrio un error desconocido al cargar el archivo'
                        }))
                    }
                    resolve(undefined);
                });
            });

            nameFields.forEach((field: INameFields) => {
                let files = []
                files = req.files[field.name]?.filter((file: any) => {
                    return file.fieldname === field.name
                })
                req.body[field.name] = files
            })

            return next();
        } catch (error: any) {
            return res.json(responseMessage.error<any>({
                message: error.message
            }))
        }
    }
}

// Configuración de multer para almacenar los archivos en la carpeta "public"
const configureMulterStorage = () => {
    const storage = multer.diskStorage({
        destination: (
            req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void
        ) => {
            callback(null, `${__dirname}/../../public`);
        },
        filename: (
            req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void
        ) => {
            setTimeout(() => {
                const fileName = file.originalname.replace(/\s/g, '_')
                callback(null, `${Date.now()}-${fileName}`);
            }, 10)
        }
    });
    // return multer({ storage: storage }).any()
    return multer({ storage: storage })
}
