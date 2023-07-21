
import jwt from "@utils/jwt";
import { IUserSchema } from "@models/ICollections";
import { ILoginDtoResponse } from "@src/routes/users/dto/ILogin.dto.response";
import mappers from "./index.mappers";

/**
 * Mappea los datos del usuario logueado que recibira el Front 
 * @param resource Recursos a utilizar en el mapper
 * @returns Nuevo objeto con los datos a eleccion
 */
export const authUser = (resource: IUserSchema): ILoginDtoResponse => {
    const mapper: ILoginDtoResponse = {
        token: jwt.tokenSign(resource),
        user: mappers.user(resource)
    }
    return mapper
};
