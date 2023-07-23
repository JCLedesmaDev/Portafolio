import { IUserSchema } from "@models/ICollections";
import collections from "@models/index.collections"
import { ApplicationError } from "@utils/applicationError";

/**
 * Obtener usuario por determinado campo
 * @param field Campo por el cual se buscara
 * @param value Valor del campo en cuestion
 * @returns Usuario encontrado o null
 */
const getUserByField = async (field: string, value: string): Promise<IUserSchema | null> => {
    try {
        const parameters = { [field]: value }
        return await collections.Users.findOne(parameters).populate([
            { strictPopulate: false, path: 'Technologies' },
            { // Hacemos populate de los proyectos que tiene el usuario
                strictPopulate: false, path: 'Projects', populate: [
                    {
                        // hacemos populate de los colaboradores de los proyectos del usuario.
                        strictPopulate: false, path: 'Colaborators'
                    }
                ]
            }
        ]);
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al obtener el usuario', source: error });
    }
}

export default { getUserByField }