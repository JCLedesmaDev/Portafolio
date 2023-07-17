import { NextFunction, Request, Response } from "express";
import { matchedData } from 'express-validator'
import { controllerWrapper } from "../../utils/controllerWrapper";
import { ILoginDto } from "./dto/ILogin.dto";
import { IRegisterDto } from "./dto/IRegister.dto";
import logic from './logic'


const loginUser = controllerWrapper(async (req: Request) => {
    //Almacenamos en "payload", los datos que cumplieron con el Validators y evita captar datos extras sin contemplar
    const payload: ILoginDto = matchedData(req) as ILoginDto

    req.locals.info = payload // Se utiliza en el eventHandler
    return await logic.loginUser(payload)
})


const registerUser = controllerWrapper(async (req: Request) => {
    //Almacenamos en "payload", los datos que cumplieron con el Validators y evita captar datos extras sin contemplar
    const payload: IRegisterDto = matchedData(req) as IRegisterDto

    req.locals.info = payload // Se utiliza en el eventHandler
    return await logic.registerUser(payload)
})

export {
    loginUser,
    registerUser
}