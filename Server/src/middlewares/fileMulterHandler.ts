import multer from 'multer'
import { Request, Response, NextFunction } from "express";
import { ApplicationError } from '@utils/applicationError'
import responseMessage from '@utils/responseMessage';


const storage = multer.diskStorage({
    filename: (
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, filename: string) => void
    ) => {
        callback(null, `${Date.now()}-${file.originalname}`); //TODO 123123213232-pepito.pdf
    },
    destination: (
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, destination: string) => void
    ) => {

        /// Ver de hacer logica para crear carpetas dinamicamente (osea de cada proyecto)
        console.log("🚀 ~ file: filesHandler.ts:19 ~ res:", req)
        const lala = 'nombre'

        callback(null, `./public/${lala}/`);
    },
});

const multerUpload = multer({ storage });


export const fileMulterHandler = (nameAttrs: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {

        const arrfields = nameAttrs.map(nameAttr => ({ name: nameAttr }))
        const upload = multerUpload.fields(arrfields)

        upload(req, res, (error: any) => {
            if (error instanceof multer.MulterError) {
                throw new ApplicationError({ message: 'Ocurrio un error al procesar  los archivos' })
            } else if (error) {
                throw new ApplicationError({ message: 'Ocurrio un error desconocido al cargar el archivo' })
            }
        })

        if (req.file !== undefined) {
            nameAttrs.forEach(nameAttr => (req.body[nameAttr] = req.file?.originalname))
        }
        return next();
    } catch (error: any) {
        return next({ message: error.message })
    }
}