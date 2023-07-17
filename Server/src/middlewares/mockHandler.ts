import { Request, Response, NextFunction } from 'express'
import path from 'path'
import fs from 'fs'
import responseMessage from '../utils/responseMessage'

/* Para utilizar este middle, debemos tener dentro del servicio, una carpeta llamada mocks y dentro un archivo con el mismo nombre
   de la ruta del controller del cual queremos mockear los datos,
    Ejem.: mocks/obtenerUsuario.json y tendremos  router.post('/obtenerUsuario', ....)
    Enviar dentro del header un 'mockmode' == true
   */
const mockHandler = (req: Request, res: Response, next: NextFunction) => {
    if (req.locals.mockmode === 'true') {
        console.log('req.originalUrl: 👉', req.originalUrl)

        const splitArr = req.originalUrl.split('/')
        console.log('Original Url Array => ', splitArr)
        const functionality = splitArr[2]
        let tool = ''
        let method

        if (splitArr[4]) {
            tool = '/' + splitArr[3]
            method = splitArr[4]
        }
        else {
            method = splitArr[3]
        }

        console.log('tool:', tool)
        console.log('method:', method)

        const ruta = `../services/${functionality}${tool}/mocks/${method}.json`
        const filePath = path.join(
            __dirname,
            ruta
        )
        console.log('Final Path => ', filePath)

        if (!fs.existsSync(filePath)) return next()

        const data = fs.readFileSync(filePath).toString()
        res.json(responseMessage.success<any>({
            message: 'MockMode: True', data: JSON.parse(data)
        }))
    } else {
        next()
    }
}

export {
    mockHandler
}
