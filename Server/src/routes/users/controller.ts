import { Request, Response } from "express";
import { matchedData } from 'express-validator'
import config from 'config'
import { controllerWrapper } from "@utils/controllerWrapper";
import logic from './logic'
import { ILoginDtoRequest } from "./dto/login.dto";
import { IUpdateUserRequest } from "./dto/updateUser.dto";


const loginUser = controllerWrapper(async (req: Request, res: Response) => {
    //Almacenamos en "payload", los datos que cumplieron con el Validators y evita captar datos extras sin contemplar
    const payload = matchedData(req) as ILoginDtoRequest

    // Es la IP de la computadora del CLiente de donde se realizo la peticion HTTP
    payload.remoteAddress = req.socket.remoteAddress || ''
    // Proporciona informacion del navegador de donde se envio la peticion.
    payload.userAgent = req.headers["user-agent"] || ''

    req.locals.info = payload // Se utiliza en el eventHandler

    const data = await logic.loginUser(payload)

    if (!data.error) {
        res.cookie('jwt', data.info.data.token, {
            // No accesible desde JavaScript en el cliente
            httpOnly: true, 
            // Al pasar este tiempo, desaparece automaticamente en el navegador
            expires: new Date(Date.now() + eval(config.get('expire_cookie'))), 
            // Firma la cookie con una clave secreta.
            signed: true, 
        })

        if (res.get('Set-Cookie')) {
            console.log('La cookie se ha agregado correctamente.', res.get('Set-Cookie'));
        } else {
            console.log('No se ha agregado ninguna cookie en la respuesta.');
        }

        delete data.info.data.token
    }
    return data
})

const getUser = controllerWrapper(async (req: Request) => {
    return await logic.getUser()
})

const updateUser = controllerWrapper(async (req: Request) => {

    //Almacenamos en "payload", los datos que cumplieron con el Validators y evita captar datos extras sin contemplar
    const payload = matchedData(req) as IUpdateUserRequest
    payload.idUser = req.locals.usrId

    req.locals.info = payload // Se utiliza en el eventHandler
    return await logic.updateUser(payload)
})

export default { loginUser, getUser, updateUser }