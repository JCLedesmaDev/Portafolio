import { IUserSchema } from "@models/ICollections";
import collections from "@models/index.collections"
import { ApplicationError } from "@utils/applicationError";
import config from 'config'
import { Types } from "mongoose";
import { IUpdateUserRequest } from "./dto/updateUser.dto";

/**
 * Obtener usuario por determinado campo
 * @param field Campo por el cual se buscara
 * @param value Valor del campo en cuestion
 * @returns Usuario encontrado o null
 */
const getUserByField = async (objFind: any): Promise<IUserSchema | null> => {
    try {
        return await collections.User.findOne(objFind).populate([
            { strictPopulate: false, path: 'Skill' },
            { // Hacemos populate de los proyectos que tiene el usuario
                strictPopulate: false, path: 'Project', populate: {
                    // hacemos populate de los colaboradores de los proyectos del usuario.
                    strictPopulate: false, path: 'Colaborator'
                }
            }
        ]);
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al obtener el usuario',
            source: error
        });
    }
}

const updateUser = async (payload: IUpdateUserRequest): Promise<IUserSchema | null> => {
    try {
        return await collections.User.findByIdAndUpdate(
            payload.idUser,
            {
                fullName: payload.fullName,
                seniority: payload.seniority,
                aboutMe: payload.aboutMe,
                mySoftSkills: payload.mySoftSkills,
                ...(payload.imageProfile && {
                    imageProfile: `${config.get('server.public_url')}/${payload.imageProfile[0].filename}`,
                }),
                curriculumVitae: payload.curriculumVitae
            }
        )
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al actualziar este album',
            source: error
        })
    }
}

const addRefProjectToUser = async (idProject: string, usrId: string): Promise<void> => {
    try {
        await collections.User.findByIdAndUpdate(usrId, {
            $push: { projectsList: new Types.ObjectId(idProject) }
        })
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al agregar el proyecto al usuario.',
            source: error
        })
    }
}
const deleteRefProjectToUser = async (idProject: string, usrId: string): Promise<void> => {
    try {
        await collections.User.findByIdAndUpdate(usrId, {
            $pull: { projectsList: new Types.ObjectId(idProject) }
        })
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al eliminar el proyecto del usuario.',
            source: error
        })
    }
}

const addRefSkillToUser = async (usrId: string, newSkillId: string): Promise<void> => {
    try {
        await collections.User.findByIdAndUpdate(usrId, {
            $push: { skillsList: new Types.ObjectId(newSkillId) }
        })
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al agregar la skill al usuario.',
            source: error
        })
    }
}
const deleteRefSkillToUser = async (idSkill: string, usrId: string): Promise<void> => {
    try {
        await collections.User.findByIdAndUpdate(usrId, {
            $pull: { skillsList: new Types.ObjectId(idSkill) }
        })
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al eliminar la skill al usuario.',
            source: error
        })
    }
}


export default { 
    getUserByField, 
    updateUser,
    addRefSkillToUser,
    deleteRefSkillToUser,
    addRefProjectToUser,
    deleteRefProjectToUser
 }