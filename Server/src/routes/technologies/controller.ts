import { controllerWrapper } from "@utils/controllerWrapper"
import { Request } from "express"
import { matchedData } from "express-validator"
import logic from './logic'
import { IGetTechnologiesRequest } from "./dto/getTechnologies.dto";
import { ICreateTechnologyRequest } from "./dto/createTechnology.dto";
import { IDeleteTechnologyRequest } from "./dto/deleteTechnology.dto";
import { IUpdateTechnologyRequest } from "./dto/updateTechnology.dto";

const getTechnologies = controllerWrapper(async (req: Request) => {
    const payload = matchedData(req) as IGetTechnologiesRequest;
    payload.usrId = req.locals.usrId

    req.locals.info = payload; 
    return await logic.getTechnologies(payload)
});

const createTechnology = controllerWrapper(async (req: Request) => {
    const payload = matchedData(req) as ICreateTechnologyRequest;
    payload.usrId = req.locals.usrId

    req.locals.info = payload;
    return await logic.createTechnology(payload)
});

const updateTechnology = controllerWrapper(async (req: Request) => {
    const payload = matchedData(req) as IUpdateTechnologyRequest;
    payload.usrId = req.locals.usrId

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
    getTechnologies,
    createTechnology,
    updateTechnology,
    deleteTechnology
}


