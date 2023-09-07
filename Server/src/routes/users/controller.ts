import { Request } from "express";
import { matchedData } from 'express-validator'
import { controllerWrapper } from "@utils/controllerWrapper";
import logic from './logic'
import { ILoginDtoRequest } from "./dto/login.dto";
import { IUpdateUserRequest } from "./dto/updateUser.dto";


const loginUser = controllerWrapper(async (req: Request) => {
    //Almacenamos en "payload", los datos que cumplieron con el Validators y evita captar datos extras sin contemplar
    const payload = matchedData(req) as ILoginDtoRequest

    req.locals.info = payload // Se utiliza en el eventHandler
    return await logic.loginUser(payload)
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