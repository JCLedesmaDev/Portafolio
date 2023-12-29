import { controllerWrapper } from "@utils/controllerWrapper";
import { Request } from "express"
import logic from './logic'
import { matchedData } from 'express-validator';
import { IGetAllLoggerDbRequest } from './dto/getAllLoggerDb.dto';

const getAllLogerDb = controllerWrapper(async (req: Request) => {

    const payload = matchedData(req) as IGetAllLoggerDbRequest

    req.locals.info = payload
    req.locals.notLogs = true

    return await logic.getAllLogerDb(payload)
});

export default {
    getAllLogerDb
}