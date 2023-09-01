import { controllerWrapper } from "@utils/controllerWrapper";
import { matchedData } from "express-validator"
import { Request } from "express"
import logic from './logic'
import { IAddProjectRequest } from "./dto/addProject.dto";

const addProject = controllerWrapper(async (req: Request) => {
    const payload = matchedData(req) as IAddProjectRequest;
    payload.usrId = req.locals.usrId

    req.locals.info = payload;
    return await logic.addProject(payload)
});

export {
    addProject
}