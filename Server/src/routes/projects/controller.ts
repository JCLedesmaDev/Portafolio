import { controllerWrapper } from "@utils/controllerWrapper";
import { matchedData } from "express-validator"
import { Request } from "express"


const addProject = controllerWrapper(async (req: Request) => {
    const payload = matchedData(req) as any;
    payload.usrId = req.locals.usrId

    req.locals.info = payload;
    // return await logic.addTechnology(payload)
    return 
});

export {
    addProject
}