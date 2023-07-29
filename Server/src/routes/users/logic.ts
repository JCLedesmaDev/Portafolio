import config from 'config'
import jwt from "@utils/jwt";
import bcrypt from "@utils/bcryptPassword"
import mappers from "@mappers/index.mappers"
import { deleteFile } from '@utils/deleteFile';
import responseMessage from "@utils/responseMessage"
import { tryCatchWrapper } from "@utils/tryCatchWrapper"
import { ApplicationError } from "@utils/applicationError"
import { IUpdateUserRequest } from './dto/updateUser';
import { ILoginDtoRequest, ILoginDtoResponse } from './dto/login';
import { IGetUserResponse } from './dto/getUser';
import externalDb from "./dal"

const loginUser = tryCatchWrapper(async (payload: ILoginDtoRequest) => {

    const user = await externalDb.getUserByField('email', payload.email);

    if (user === null) {
        throw new ApplicationError({ message: 'Usuario inexistente. Intentelo nuevamente' });
    }

    const comparePassword = await bcrypt.compare(payload.password, user.password)

    if (!comparePassword) {
        throw new ApplicationError({ message: 'Contraseña incorrecta. Intentelo nuevamente' })
    }

    const response: ILoginDtoResponse = {
        token: jwt.tokenSign(user),
        user: mappers.user(user)
    }

    return responseMessage.success<ILoginDtoResponse>({
        message: 'Ha iniciado sesion correctamente!', data: response
    })
})

const getUser = tryCatchWrapper(async () => {
    const user = await externalDb.getUserByField('email', config.get("email_admin"));

    if (user === null) {
        throw new ApplicationError({ message: 'Usuario no encontrado.' });
    }

    const response: IGetUserResponse = {
        user: mappers.user(user)
    }

    return responseMessage.success<IGetUserResponse>({
        data: response
    })
})

const updateUser = tryCatchWrapper(async (payload: IUpdateUserRequest) => {

    const user = await externalDb.getUserByField('_id', payload.idUser);

    if (user === null) {
        throw new ApplicationError({ message: 'Usuario inexistente. Intentelo nuevamente' });
    }

    if (payload.imageProfile && user.imageProfile !== '') {
        const pathImage = user.imageProfile.split(`${config.get('server.public_url')}/`)[1]
        deleteFile(pathImage)
    }

    await externalDb.updateUser(payload)

    return responseMessage.success({
        message: 'Se edito correctamente!',
    })
})




export default { loginUser, getUser, updateUser }