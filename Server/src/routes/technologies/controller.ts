import { controllerWrapper } from "@utils/controllerWrapper"
import { Request } from "express"
import { matchedData } from "express-validator"
import logic from './logic'
import { IGetTechnologiesRequest } from "./dto/getTechnologies";

const getTechnologies = controllerWrapper(async (req: Request) => {
    const payload = matchedData(req) as IGetTechnologiesRequest;
    payload.usrId = req.locals.usrId

    req.locals.info = payload; 
    return await logic.getTechnologies(payload)
});

const createTechnology = controllerWrapper(async (req: Request) => {
    const payload: any = matchedData(req as any);

    req.locals.info = payload;
    return true
});

const updateTechnology = controllerWrapper(async (req: Request) => {
    const payload: any = matchedData(req as any);

    req.locals.info = payload;
    return true
});

const deleteTechnology = controllerWrapper(async (req: Request) => {
    const payload: any = matchedData(req as any);

    req.locals.info = payload;
    return true
});

export {
    getTechnologies,
    createTechnology,
    updateTechnology,
    deleteTechnology
}


