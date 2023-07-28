import { controllerWrapper } from "@utils/controllerWrapper"
import { Request } from "express"
import { matchedData } from "express-validator"

const getTechnologies = controllerWrapper(async (req: Request) => {
    const payload: any = matchedData(req as any);

    req.locals.info = payload;
    return true
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


