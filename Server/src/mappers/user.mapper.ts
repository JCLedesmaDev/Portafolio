import { IUser } from "@interface/IUser";
import { IProjectSchema, ISkillSchema, IUserSchema } from "@models/ICollections";
import mappers from "./index.mappers";

/**
 * Mappea los datos del usuario que recibira el Front 
 * @param resource Recursos a utilizar en el mapper
 * @returns Nuevo objeto con los datos a eleccion
 */
export const user = (resource: IUserSchema): IUser => {
    const mapper: IUser = {
        id: resource._id,
        fullName: resource.fullName,
        imageProfile: resource.imageProfile,
        seniority: resource.seniority,
        aboutMe: resource.aboutMe,
        email: resource.email,
        curriculumVitae: resource.curriculumVitae,
        mySoftSkills: resource.mySoftSkills,
        projectsList: mappers.multipleProjects(resource.projectsList as IProjectSchema[]),
        skillsList: mappers.multipleSkills(resource.skillsList as ISkillSchema[])
    }
    return mapper
};



