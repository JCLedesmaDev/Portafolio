import { IUser } from "@interface/IUser";
import { IProjectSchema, ITechnologySchema, IUserSchema } from "@models/ICollections";
import mappers from "./index.mappers";

/**
 * Mappea los datos del usuario que recibira el Front 
 * @param resource Recursos a utilizar en el mapper
 * @returns Nuevo objeto con los datos a eleccion
 */
const singleUser = (resource: IUserSchema): IUser => {
    const mapper: IUser = {
        id: resource._id,
        fullName: resource.fullName,
        email: resource.email,
        aboutMe: resource.aboutMe,
        curriculumVitae: resource.curriculumVitae,
        mySkills: resource.mySkills,
        seniority: resource.seniority,
        projectList: mappers.multipleProjects(resource.projectList as IProjectSchema[]),
        techologyList: mappers.multipleTechnologies(resource.techologyList as ITechnologySchema[])
    }
    return mapper
};

export default singleUser;


