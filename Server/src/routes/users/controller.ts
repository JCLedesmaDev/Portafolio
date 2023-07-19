import { Request } from "express";
import { matchedData } from 'express-validator'
import { controllerWrapper } from "../../utils/controllerWrapper";
import { ILoginDto } from "./dto/ILogin.dto";
import logic from './logic'


const loginUser = controllerWrapper(async (req: Request) => {
    //Almacenamos en "payload", los datos que cumplieron con el Validators y evita captar datos extras sin contemplar
    const payload: ILoginDto = matchedData(req) as ILoginDto

    req.locals.info = payload // Se utiliza en el eventHandler
    return await logic.loginUser(payload)
})


export { loginUser }