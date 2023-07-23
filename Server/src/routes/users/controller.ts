import { Request } from "express";
import { matchedData } from 'express-validator'
import { controllerWrapper } from "@utils/controllerWrapper";
import { ILoginDtoRequest } from "./dto/ILogin.dto.request";
import logic from './logic'


const loginUser = controllerWrapper(async (req: Request) => {
    //Almacenamos en "payload", los datos que cumplieron con el Validators y evita captar datos extras sin contemplar
    const payload = matchedData(req) as ILoginDtoRequest

    req.locals.info = payload // Se utiliza en el eventHandler
    return await logic.loginUser(payload)
})

const getUser = controllerWrapper(async (req: Request) => (
    await logic.getUser()
))

export { loginUser, getUser }