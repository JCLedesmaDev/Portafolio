import { IFilterPagination } from "@interface/index.interfaces";
import { ILoggerDbSchema } from "@models/ICollections"
import collections from "@models/index.collections";
import { ApplicationError } from "@utils/applicationError";
import { FilterQuery, PaginateOptions, PaginateResult } from "mongoose";



const getAllLogerDb = async (opts: IFilterPagination): Promise<PaginateResult<ILoggerDbSchema>> => {
    try {
        const { page, filterText = '' } = opts

        const options: PaginateOptions = {
            page,
            limit: 10,
            populate: {
                strictPopulate: false,
                path: 'user' // hace referencia al nombre del attr.
            }
        }
        const query: FilterQuery<ILoggerDbSchema> = {
            ...((filterText !== '') && {
                type: { $regex: new RegExp(filterText), $options: 'i' }
            }),
        }
        return await collections.LoggerDb.paginate(query, options)
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al obtener el listado de registros',
            source: error
        })
    }
}

export default {
    getAllLogerDb,
}