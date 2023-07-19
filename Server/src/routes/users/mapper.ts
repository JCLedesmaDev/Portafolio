import { IAuth } from "../../interface/IAuth";
import { IUserSchema } from "../../models/collections/Users";
import jwt from "../../utils/jwt";


/**
 * Mappea los datos del usuario logueado que recibira el Front 
 * @param resource Recursos a utilizar en el mapper
 * @returns Nuevo objeto con los datos a eleccion
 */
const singleUserAuth = async (resource: IUserSchema): Promise<IAuth> => {
    const mapper: IAuth = {
        token: jwt.tokenSign(resource),
        user: {
            id: resource._id,
            fullName: resource.fullName,
            email: resource.email
        }
    }
    return mapper
};

export default { singleUserAuth };


