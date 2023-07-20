import bcrypt from "@utils/bcryptPassword"
import responseMessage from "@utils/responseMessage"
import { tryCatchWrapper } from "@utils/tryCatchWrapper"
import { ApplicationError } from "@utils/applicationError"
import mapper from './mapper'
import externalDb from "./dal"
import { ILoginDtoRequest } from "./dto/ILogin.dto.request"
import { ILoginDtoResponse } from "./dto/ILogin.dto.response"



const loginUser = tryCatchWrapper(async (payload: ILoginDtoRequest) => {

    const user = await externalDb.getUserByField('email', payload.email);

    if (user === null) {
        throw new ApplicationError({ message: 'Usuario inexistente. Intentelo nuevamente' });
    }

    const comparePassword = await bcrypt.compare(payload.password, user.password)

    if (!comparePassword) {
        throw new ApplicationError({ message: 'Contraseña incorrecta. Intentelo nuevamente' })
    }

    const userMapper: ILoginDtoResponse = await mapper.singleUserAuth(user)

    return responseMessage.success<ILoginDtoResponse>({
        message: 'Ha iniciado sesion correctamente!', data: userMapper
    })
})


export default { loginUser }