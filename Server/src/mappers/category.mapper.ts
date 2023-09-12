import { ICategory } from "@interface/index.interfaces";
import { ICategorySchema } from "@models/ICollections";


export const multipleCategories = (resource: ICategorySchema[]): ICategory[] => {
    return resource.map(project => singleCategory(project))
}

/**
 * Mappea los datos de un proyecto 
 * @param resource Recursos a utilizar en el mapper
 * @returns Nuevo objeto con los datos a eleccion
 */
export const singleCategory = (resource: ICategorySchema): ICategory => {
    const mapper: ICategory = {
        id: resource._id,
        name: resource.name
    }
    return mapper
};



