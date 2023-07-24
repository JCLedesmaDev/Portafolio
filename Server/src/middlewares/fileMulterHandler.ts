import multer from 'multer'
import { Request, Response, NextFunction } from "express";
import { ApplicationError } from '@utils/applicationError'
import responseMessage from '@utils/responseMessage';


const storage = multer.diskStorage({

    destination: (
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, destination: string) => void
    ) => {

        /// Ver de hacer logica para crear carpetas dinamicamente (osea de cada proyecto)
        // console.log("🚀 ~ file: filesHandler.ts:19 ~ res:", req)
        // const lala = 'nombre'
        // if (req.files !== undefined) {
        //     req.files.forEach(nameAttr => (req.body[nameAttr] = req.file?.originalname))
        // }

        callback(null, `${__dirname}/../../public`);
    },
    filename: (
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, filename: string) => void
    ) => {
        console.log("🚀 ~ file: fileMulterHandler.ts:13 ~ req:", req)
        callback(null, `${Date.now()}-${file.originalname}`); //TODO 123123213232-pepito.pdf
    }
});

export const multerUpload = multer({ storage: storage });


export const fileMulterHandler = (nameAttrs: string[]) => {

    const arrfields = nameAttrs.map(nameAttr => ({ name: nameAttr }))
    const upload = multerUpload.fields(arrfields)

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            upload(req, res, (error: any) => {
                if (error instanceof multer.MulterError) {
                    throw new ApplicationError({ message: 'Ocurrio un error al procesar  los archivos' })
                } else if (error) {
                    throw new ApplicationError({ message: 'Ocurrio un error desconocido al cargar el archivo' })
                }

                // if (req.file !== undefined) {
                //     nameAttrs.forEach(nameAttr => (req.body[nameAttr] = req.file?.originalname))
                // }
            })
            console.log("🚀 ~ file: fileMulterHandler.ts:48 ~ upload ~ req:", req)
            return next();
        } catch (error: any) {
            return res.json(responseMessage.error<any>({
                message: error.message
            }))
        }
    }
}
