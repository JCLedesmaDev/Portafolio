import config from 'config'
import externalDb from "./dal"
import mappers from "@mappers/index.mappers"
import { IUserSchema } from '@models/ISchemaCollections';
import { IGetUserResponse } from './dto/getUser.dto';
import { IUpdateUserRequest } from './dto/updateUser.dto';
import { IGetAllUserResponse } from './dto/getAllUsers.dto';
import { ILoginDtoRequest, ILoginDtoResponse } from './dto/login.dto';
import { jwt, bcrypt, deleteFile, responseMessage, ApplicationError } from "@utils/index.utils";

const loginUser = async (payload: ILoginDtoRequest) => {

    const user = await externalDb.getUserByField({
        email: payload.email
    });

    if (user === null) throw new ApplicationError({
        message: 'Usuario inexistente. Intentelo nuevamente'
    });

    const comparePassword = await bcrypt.compare(
        payload.password, user.password
    )

    if (!comparePassword) throw new ApplicationError({
        message: 'Contraseña incorrecta. Intentelo nuevamente'
    })

    const response: ILoginDtoResponse = {
        token: jwt.tokenSign({
            _id: user._id,
            userAgent: payload.userAgent,
            remoteAddress: payload.remoteAddress,
        }),
        user: mappers.singleUser(user)
    }

    return responseMessage.success<ILoginDtoResponse>({
        message: 'Ha iniciado sesion correctamente!',
        data: response
    })
}

const logOutUser = async () => {
    return responseMessage.success<boolean>({ data: true })
}

const getUser = async () => {
    const user = await externalDb.getUserByField({
        email: config.get("email_admin")
    });

    if (user === null) throw new ApplicationError({
        message: 'Usuario no encontrado.'
    });


    const response: IGetUserResponse = {
        user: mappers.singleUser(user)
    }

    return responseMessage.success<IGetUserResponse>({
        data: response
    })
}

const updateUser = async (payload: IUpdateUserRequest) => {

    const user = await externalDb.getUserByField({
        _id: payload.idUser
    });

    if (user === null) throw new ApplicationError({
        message: 'Usuario inexistente. Intentelo nuevamente'
    });

    const userUpdate = await externalDb.updateUser(payload)

    if (userUpdate && payload.imageProfile && user.imageProfile !== '') {
        deleteFile(user.imageProfile)
    }

    if (userUpdate && payload.curriculumVitae && user.curriculumVitae !== '') {
        deleteFile(user.curriculumVitae)
    }

    const response: IGetUserResponse = {
        user: mappers.singleUser(userUpdate as IUserSchema)
    }

    delete response.user.id

    return responseMessage.success({
        message: 'Se edito correctamente!',
        data: response
    })
}

const getAllUser = async () => {
    const listUsers = await externalDb.getAllUser()

    const response: IGetAllUserResponse = {
        users: mappers.multipleUsers(listUsers)
    }

    return responseMessage.success<IGetAllUserResponse>({
        data: response
    })
}


export default { loginUser, logOutUser, getUser, updateUser, getAllUser }