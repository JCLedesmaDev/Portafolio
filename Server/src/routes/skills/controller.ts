import logic from './logic'
import { Request } from "express"
import { matchedData } from "express-validator"
import { controllerWrapper } from "@utils/controllerWrapper"
import { IGetSkillsRequest } from "./dto/getSkills.dto";
import { IAddTechnologyRequest } from "./dto/addTechnology.dto";
import { IDeleteTechnologyRequest } from "./dto/deleteTechnology.dto";
import { IUpdateTechnologyRequest } from "./dto/updateTechnology.dto";

const getSkills = controllerWrapper(async (req: Request) => {
    const payload = matchedData(req) as IGetSkillsRequest;
    payload.usrId = req.locals.usrId

    req.locals.info = payload; 
    return await logic.getSkills(payload)
});

const addTechnology = controllerWrapper(async (req: Request) => {
    const payload = matchedData(req) as IAddTechnologyRequest;
    payload.usrId = req.locals.usrId

    req.locals.info = payload;
    return await logic.addTechnology(payload)
});

const updateTechnology = controllerWrapper(async (req: Request) => {
    const payload = matchedData(req) as IUpdateTechnologyRequest;

    req.locals.info = payload;
    return await logic.updateTechnology(payload)
});

const deleteTechnology = controllerWrapper(async (req: Request) => {
    const payload = matchedData(req) as IDeleteTechnologyRequest;
    payload.usrId = req.locals.usrId

    req.locals.info = payload;
    return await logic.deleteTechnology(payload)
});

export {
    getSkills,
    addTechnology,
    updateTechnology,
    deleteTechnology
}


