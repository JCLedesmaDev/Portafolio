import jwt from "../../utils/jwt";
import { ILoginDtoResponse } from "./dto/ILogin.dto.response";
import { IUserSchema } from "@models/ICollections";


/**
 * Mappea los datos del usuario logueado que recibira el Front 
 * @param resource Recursos a utilizar en el mapper
 * @returns Nuevo objeto con los datos a eleccion
 */
const singleUserAuth = async (resource: IUserSchema): Promise<ILoginDtoResponse> => {
    const mapper: ILoginDtoResponse = {
        token: jwt.tokenSign(resource),
        user: {
            id: resource._id,
            fullName: resource.fullName,
            email: resource.email,
            aboutMe: resource.aboutMe,
            curriculumVitae: resource.curriculumVitae,
            mySkills: resource.mySkills,
            seniority: resource.seniority,
            projectList: [], // resource.projectList, // mapear los proyectos.
            techologyList: [] // resource.techologyList, // mapear los techologyList.
        }
    }
    return mapper
};

export default { singleUserAuth };


