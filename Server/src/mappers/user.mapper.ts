import { IUser } from "@interface/IUser";
import { IProjectSchema, ITechnologySchema, IUserSchema } from "@models/ICollections";
import mappers from "./index.mappers";

/**
 * Mappea los datos del usuario que recibira el Front 
 * @param resource Recursos a utilizar en el mapper
 * @returns Nuevo objeto con los datos a eleccion
 */
export const user = (resource: IUserSchema): IUser => {
    const mapper: IUser = {
        id: resource._id,
        email: resource.email,
        aboutMe: resource.aboutMe,
        mySkills: resource.mySkills,
        fullName: resource.fullName,
        seniority: resource.seniority,
        imageProfile: resource.imageProfile,
        curriculumVitae: resource.curriculumVitae,
        projectList: mappers.multipleProjects(resource.projectList as IProjectSchema[]),
        skills: mappers.multipleSkills(resource.techologyList as ITechnologySchema[])
    }
    return mapper
};



