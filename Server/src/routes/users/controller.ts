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

    req.locals.info = payload // Se utiliza en el eventHandler
    const data = await logic.loginUser(payload)

    res.cookie('jwt', data.token, {
        httpOnly: true, // No accesible desde JavaScript en el cliente
        expires: new Date(Date.now() + Number(config.get('expire_jwt'))),
        signed: true // Firma la cookie con una clave secreta.
    })
    // ('kwt', 'valorDeLaCookie', { httpOnly: true });

    return data.user
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