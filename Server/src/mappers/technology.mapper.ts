import { ITechnology } from "@interface/ITechnology";
import { ITechnologySchema } from "@models/ICollections";

/**
 * Mappea los datos de muchas tecnologias
 * @param resource Recursos a utilizar en el mapper
 * @returns Nuevo objeto con los datos a eleccion
 */
export const multipleTechnologies = (resource: ITechnologySchema[]): ITechnology[] => {
    return resource.map(project => singleTechnology(project))
}

const singleTechnology = (resource: ITechnologySchema): ITechnology => {
    const mapper: ITechnology = {
        id: resource._id,
        image: resource.image,
        name: resource.name
    }
    return mapper
};



