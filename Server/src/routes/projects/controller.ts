import { controllerWrapper } from "@utils/controllerWrapper";
import { matchedData } from "express-validator"
import { Request } from "express"
import logic from './logic'
import { IAddProjectRequest } from "./dto/addProject.dto";
import { IDeleteProjectRequest } from "./dto/deleteProject.dto";
import { IUpdateProjectRequest } from "./dto/updateProject.dto.";

const addProject = controllerWrapper(async (req: Request) => {
    const payload = matchedData(req) as IAddProjectRequest;
    payload.usrId = req.locals.usrId

    req.locals.info = payload;
    return await logic.addProject(payload)
});

const updateProject = controllerWrapper(async (req: Request) => {
    const payload = matchedData(req) as IUpdateProjectRequest;
    payload.usrId = req.locals.usrId

    req.locals.info = payload;
    return await logic.updateProject(payload)
});

const deleteProject = controllerWrapper(async (req: Request) => {
    const payload = matchedData(req) as IDeleteProjectRequest;
    payload.usrId = req.locals.usrId

    req.locals.info = payload;
    return await logic.deleteProject(payload)
});


export {
    addProject,
    updateProject,
    deleteProject
}