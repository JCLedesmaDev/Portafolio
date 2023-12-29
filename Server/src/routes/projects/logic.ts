import mappers from "@mappers/index.mappers";
import externalDbUser from "@src/routes/users/dal"
import responseMessage from "@utils/responseMessage";
import { ApplicationError } from "@utils/applicationError";
import { IAddProjectRequest, IAddProjectResponse } from "./dto/addProject.dto";
import externalDb from './dal'
import { IDeleteProjectRequest } from "./dto/deleteProject.dto";
import { deleteFile } from "@utils/deleteFile";
import { IUpdateProjectRequest, IUpdateProjectResponse } from "./dto/updateProject.dto.";
import { IProjectSchema } from "@models/ICollections";


const addProject = async (payload: IAddProjectRequest) => {
    const fndProject = await externalDb.findProjectByField({
        name: payload.name
    })

    if (fndProject === null) throw new ApplicationError({
        message: 'Ya existe un proyecto con este nombre. Intentelo nuevamente'
    })


    const newProject = await externalDb.addNewProject(payload)
    externalDbUser.addRefProjectToUser(newProject._id, payload.usrId)

    const response: IAddProjectResponse = {
        project: mappers.singleProject(newProject)
    }

    return responseMessage.success<IAddProjectResponse>({
        message: 'Ha creado una tecnologia exitosamente!',
        data: response
    })
}

const deleteProject = async (payload: IDeleteProjectRequest) => {
    const fndProject = await externalDb.findProjectByField({
        _id: payload.idProject
    })

    if (fndProject === null) throw new ApplicationError({
        message: 'No existe un proyecto con este nombre. Intentelo nuevamente'
    })


    const projectDelete = await externalDb.deleteProject(payload.idProject);

    if (projectDelete) {
        fndProject.images.forEach(image => deleteFile(image))
        externalDbUser.addRefProjectToUser(fndProject._id, payload.usrId)
    }

    return responseMessage.success({
        message: 'Se elimino correctamente!',
    })
}

const updateProject = async (payload: IUpdateProjectRequest) => {
    const fndProject = await externalDb.findProjectByField({
        _id: payload.idProject
    })

    if (fndProject === null) throw new ApplicationError({
        message: 'No existe un proyecto con este nombre. Intentelo nuevamente'
    })


    const projectUpdate = await externalDb.updateProject(payload)

    if (projectUpdate && payload.images.length > 0 && fndProject.images.length > 0) {
        projectUpdate.images.forEach(image => {
            deleteFile(image)
        })
    }

    const response: IUpdateProjectResponse = {
        project: mappers.singleProject(projectUpdate as IProjectSchema)
    }

    return responseMessage.success<IUpdateProjectResponse>({
        message: 'Se edito exitosamente!',
        data: response
    })
}

export default {
    addProject,
    updateProject,
    deleteProject
}