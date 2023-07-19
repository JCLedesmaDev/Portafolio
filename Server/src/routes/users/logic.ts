import externalDb from "./dal"
import { ApplicationError } from "../../utils/applicationError"
import { ILoginDto } from "./dto/ILogin.dto"
import bcrypt from "../../utils/bcryptPassword"
import responseMessage from "../../utils/responseMessage"
import mapper from './mapper'

import { tryCatchWrapper } from "../../utils/tryCatchWrapper"
import { IAuth } from "../../interface/IAuth"


const loginUser = tryCatchWrapper(async (payload: ILoginDto) => {

    const user = await externalDb.getUserByField('email', payload.email);

    if (user === null) {
        throw new ApplicationError({ message: 'Usuario inexistente. Intentelo nuevamente' });
    }

    const comparePassword = await bcrypt.compare(payload.password, user.password)

    if (!comparePassword) {
        throw new ApplicationError({ message: 'Contraseña incorrecta. Intentelo nuevamente' })
    }

    const userMapper: IAuth = await mapper.singleUserAuth(user)

    return responseMessage.success<IAuth>({
        message: 'Ha iniciado sesion correctamente!', data: userMapper
    })
})


export default { loginUser }