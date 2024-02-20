import logic from './logic'
import config from 'config'
import { Request, Response } from "express";
import { matchedData } from 'express-validator'
import { ILoginDtoRequest } from "./dto/login.dto";
import { controllerWrapper } from "@utils/index.utils";
import { IUpdateUserRequest } from "./dto/updateUser.dto";


const loginUser = controllerWrapper(async (req: Request, res: Response) => {

    //Almacenamos en "payload", los datos que cumplieron con el Validators y evita captar datos extras sin contemplar
    const payload = matchedData(req) as ILoginDtoRequest

    // Es la IP de la computadora del CLiente de donde se realizo la peticion HTTP
    payload.remoteAddress = req.socket.remoteAddress || ''
    // Proporciona informacion del navegador de donde se envio la peticion.
    payload.userAgent = req.headers["user-agent"] || ''

    req.locals.info = payload // Se utiliza en el eventHandler

    const data: any = await logic.loginUser(payload)

    req.locals.usrId = data.info.data.user.id

    res.cookie('jwt', data.info.data.token, {
        // No accesible desde JavaScript en el cliente
        httpOnly: true,
        // Al pasar este tiempo, desaparece automaticamente en el navegador
        expires: new Date(Date.now() + eval(config.get('expire_cookie'))),
        signed: true, // Firma la cookie con una clave secreta.
        sameSite: "strict"
    })

    res.cookie('infoUsr', data.info.data.user.id, {
        // No accesible desde JavaScript en el cliente
        httpOnly: true,
        // Al pasar este tiempo, desaparece automaticamente en el navegador
        expires: new Date(Date.now() + eval(config.get('expire_cookie'))),
        signed: true, // Firma la cookie con una clave secreta.
        sameSite: "strict"
    })

    delete data.info.data.user.id
    delete data.info.data.token

    return data
})

const logOutUser = controllerWrapper(async (req: Request, res: Response) => {
    res.clearCookie('jwt')
    res.clearCookie('infoUsr')
    return logic.logOutUser()
})

const getAllUser = controllerWrapper(async (req: Request) => {
    req.locals.notLogs = true
    return await logic.getAllUser()
})

const getUser = controllerWrapper(async (req: Request) => {
    const data: any = await logic.getUser()
    delete data.info.data.user.id
    return data
})

const updateUser = controllerWrapper(async (req: Request) => {

    //Almacenamos en "payload", los datos que cumplieron con el Validators y evita captar datos extras sin contemplar
    const payload = matchedData(req) as IUpdateUserRequest
    payload.idUser = req.locals.usrId

    req.locals.info = payload // Se utiliza en el eventHandler
    return await logic.updateUser(payload)
})

export default { loginUser, logOutUser, getUser, updateUser, getAllUser }