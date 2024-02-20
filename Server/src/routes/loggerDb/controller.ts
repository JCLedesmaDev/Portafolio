import logic from './logic'
import { Request } from "express"
import { matchedData } from 'express-validator';
import { controllerWrapper } from "@utils/index.utils";
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