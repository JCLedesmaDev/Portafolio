import collections from "@models/index.collections"
import { IGetTechnologiesRequest } from "./dto/getTechnologies"
import { ApplicationError } from "@utils/applicationError";
import { ITechnologySchema } from "@models/ICollections";
import { FilterQuery, PaginateOptions, PaginateResult } from "mongoose";

const getTechnologies = async (
    payload: IGetTechnologiesRequest
): Promise<PaginateResult<ITechnologySchema>> => {
    try {
        const query: FilterQuery<ITechnologySchema> = {
            _id: payload.usrId
        }
        const options: PaginateOptions = {
            page: payload.page,
            limit: 6,
            populate: { strictPopulate: false, path: 'Categories' }
        }

        return await collections.Technologies.paginate(query, options)
    } catch (error) {
        throw new ApplicationError({
            message: 'Ocurrio un error al obtener las tecnologias', source: error
        });
    }
}


export default {
    getTechnologies
}