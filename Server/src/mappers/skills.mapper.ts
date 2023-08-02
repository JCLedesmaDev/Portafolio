import { ITechnology } from "@interface/ITechnology";
import { ICategorySchema, ITechnologySchema } from "@models/ICollections";
import mappers from "./index.mappers";
import { response } from "express";

export const multipleTechnologies = (resource: ITechnologySchema[]): ITechnology[] => {
    return resource.map(project => singleTechnology(project))
}

/**
 * Mappea los datos de un proyecto 
 * @param resource Recursos a utilizar en el mapper
 * @returns Nuevo objeto con los datos a eleccion
 */
const singleTechnology = (resource: ITechnologySchema): ITechnology => {
    const mapper: ITechnology = {
        id: resource._id,
        image: resource.image,
        category: mappers.singleCategory(resource.category as ICategorySchema),
        name: resource.name

    }
    return mapper
};


