import config from 'config'
import jwt from "@utils/jwt";
import bcrypt from "@utils/bcryptPassword"
import mappers from "@mappers/index.mappers"
import responseMessage from "@utils/responseMessage"
import { tryCatchWrapper } from "@utils/tryCatchWrapper"
import { ApplicationError } from "@utils/applicationError"
import externalDb from "./dal"
import { ILoginDtoRequest } from "./dto/ILogin.dto.request"
import { ILoginDtoResponse } from "./dto/ILogin.dto.response"
import { IGetUserResponse } from './dto/IGetUser.response';
import { IUpdateUserRequest } from './dto/IUpdateUser.request';

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
// app.post("/upload", upload.single("myFile"), (req, res) => {
//     const file = req.file.filename;
//     console.log(file)
//     res.send({ data: "OK", url: `http://localhost:3000/${file}` });
//   });

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

    await externalDb.updateUser(payload)

    return responseMessage.success<any>({
        message: 'Se edito correctamente!',
    })
})




export default { loginUser, getUser, updateUser }