import { IUserSchema } from "../../models/collections/Users";
import collections from "../../models/index.collections"
import { ApplicationError } from "../../utils/applicationError";
import { IRegisterDto } from "./dto/IRegister.dto";

/**
 * Obtener usuario por determinado campo
 * @param field Campo por el cual se buscara
 * @param value Valor del campo en cuestion
 * @returns Usuario encontrado o null
 */
const getUserByField = async (field: string, value: string): Promise<IUserSchema | null> => {
    try {
        const parameters = { [field]: value }
        return await collections.Users.findOne(parameters).populate({ path: 'roles' });
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al obtener el usuario', source: error });
    }
}

/**
 * Crear un Usuario en la coleccion
 * @param payload Datos del futuro usuario.
 */
const createUser = async (payload: IRegisterDto): Promise<void> => {
    try {
        const rolUser = await collections.Roles.findOne({ name: 'User' })
        
        const parameters = {
            email: payload.email,
            fullName: payload.fullName,
            password: payload.password,
            roles: [rolUser?._id] // Rol: User
        }

        await collections.Users.create(parameters)
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al crear un usuario', source: error });
    }
}

export default {
    getUserByField,
    createUser
}