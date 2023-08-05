import logic from './logic'
import { Request } from "express"
import { matchedData } from "express-validator"
import { controllerWrapper } from "@utils/controllerWrapper"
import { IGetTechnologiesRequest } from "./dto/getTechnologies.dto";
import { ICreateTechnologyRequest } from "./dto/createTechnology.dto";
import { IDeleteTechnologyRequest } from "./dto/deleteTechnology.dto";
import { IUpdateTechnologyRequest } from "./dto/updateTechnology.dto";

const getSkills = controllerWrapper(async (req: Request) => {
    const payload = matchedData(req) as IGetTechnologiesRequest;
    payload.usrId = req.locals.usrId

    req.locals.info = payload; 
    return await logic.getSkills(payload)
});


const createTechnology = controllerWrapper(async (req: Request) => {
    const payload = matchedData(req) as ICreateTechnologyRequest;
    payload.usrId = req.locals.usrId

    req.locals.info = payload;
    return await logic.createTechnology(payload)
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
    createTechnology,
    updateTechnology,
    deleteTechnology
}


