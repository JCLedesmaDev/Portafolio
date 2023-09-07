import { controllerWrapper } from "@utils/controllerWrapper";
import { Request } from "express"
import logic from './logic'
import { IFilterPagination } from "@interface/pagination";

const getAllLogerDb = controllerWrapper(async (req: Request) => {
    const payload = {
        page: req.query.page || 1,
        filterText: req.query.filterText || ''
    } as IFilterPagination

    req.locals.info = payload
    
    return await logic.getAllLogerDb(payload)
});

export default {
    getAllLogerDb
}