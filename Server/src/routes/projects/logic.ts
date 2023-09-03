import mappers from "@mappers/index.mappers";
import externalDbUser from "@src/routes/users/dal"
import responseMessage from "@utils/responseMessage";
import { tryCatchWrapper } from "@utils/tryCatchWrapper";
import { ApplicationError } from "@utils/applicationError";
import { IAddProjectRequest, IAddProjectResponse } from "./dto/addProject.dto";
import externalDb from './dal'


const addProject = tryCatchWrapper(async (payload: IAddProjectRequest) => {
    const fndProject = await externalDb.findProjectByField({
        name: payload.name
    })

    if (fndProject === null) {
        throw new ApplicationError({
            message: 'Ya existe un proyecto con este nombre. Intentelo nuevamente'
        })
    }

    const newProject = await externalDb.addNewProject(payload)
    externalDbUser.addRefProjectToUser(newProject._id, payload.usrId)

    const response: IAddProjectResponse = {
        project: mappers.singleProject(newProject)
    }

    return responseMessage.success<IAddProjectResponse>({
        message: 'Ha creado una tecnologia exitosamente!',
        data: response
    })
})


 
export default {
    addProject
}