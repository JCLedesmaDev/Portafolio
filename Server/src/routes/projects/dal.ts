import config from 'config'
import { Types } from "mongoose";
import collections from "@models/index.collections";
import { IProjectSchema } from "@models/ICollections"
import { ApplicationError } from "@utils/index.utils";
import { IAddProjectRequest } from "./dto/addProject.dto";
import { IUpdateProjectRequest } from "./dto/updateProject.dto.";


const findProjectByField = async (objFind: any): Promise<IProjectSchema | null> => {
    try {
        return await collections.Project.findOne(objFind)
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al obtener el projecto',
            source: error
        });
    }
}


const addNewProject = async (payload: IAddProjectRequest): Promise<IProjectSchema> => {
    try {
        return await collections.Project.create({
            name: payload.name,
            description: payload.description,
            details: payload.details,
            periodTimeFrom: payload.periodTimeFrom,
            periodTimeTo: payload.periodTimeTo,
            typeProject: payload.typeProject,
            projectLink: payload.projectLink,
            repositoryLink: payload.repositoryLink,
            images: payload.images.map(img => (
                `${config.get('server.public_url')}/${img.filename}`
            )),
            colaboratorsList: payload.colaboratorsList,
            user: new Types.ObjectId(payload.usrId),
        })
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al agregar el proyecto.',
            source: error
        })
    }
}

const deleteProject = async (idProject: string): Promise<boolean> => {
    try {
        const newSkill = await collections.Project.deleteById(idProject)
        return newSkill.deletedCount === 1
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al eliminar.',
            source: error
        })
    }
}

const updateProject = async (payload: IUpdateProjectRequest): Promise<IProjectSchema | null> => {
    try {
        return await collections.Project.findByIdAndUpdate(
            payload.idProject,
            {
                name: payload.name,
                description: payload.description,
                details: payload.details,
                periodTimeFrom: payload.periodTimeFrom,
                periodTimeTo: payload.periodTimeTo,
                typeProject: payload.typeProject,
                projectLink: payload.projectLink,
                repositoryLink: payload.repositoryLink,
                ...(payload.images.length > 0 && {
                    images: payload.images.map(img => (
                        `${config.get('server.public_url')}/${img.filename}`
                    )),
                }),
                colaboratorsList: payload.colaboratorsList,
                user: new Types.ObjectId(payload.usrId),
            },
            { new: true }
        )
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al actualziar este proyecto',
            source: error
        })
    }
}

export default {
    findProjectByField,
    addNewProject,
    deleteProject,
    updateProject
}