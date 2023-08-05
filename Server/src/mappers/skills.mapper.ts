import { ICategorySchema, ISkillSchema, ITechnologySchema } from "@models/ICollections";
import mappers from "./index.mappers";
import { ISkill } from "@interface/ISkill";


/**
 * Mappea los datos de las habilidades del suaurio.
 * @param resource Recursos a utilizar en el mapper
 * @returns Nuevo objeto con los datos a eleccion
 */
export const multipleSkills = (resource: ISkillSchema[]): ISkill[] => {
    return resource.map(skill => singleSkill(skill))
}

const singleSkill = (resource: ISkillSchema): ISkill => {
    const mapper: ISkill = {
        id: resource._id,
        category: mappers.singleCategory(resource.category as ICategorySchema),
        techologysList: mappers.multipleTechnologies(resource.techologysList as ITechnologySchema[])
    }
    return mapper
};



