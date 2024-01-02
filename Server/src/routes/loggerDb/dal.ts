import { ILoggerDbSchema } from "@models/ICollections"
import collections from "@models/index.collections";
import { ApplicationError } from "@utils/applicationError";
import { FilterQuery, PaginateOptions, PaginateResult, Types } from "mongoose";
import { IGetAllLoggerDbRequest } from './dto/getAllLoggerDb.dto';
import moment from 'moment';



const getAllLogerDb = async (opts: IGetAllLoggerDbRequest): Promise<PaginateResult<ILoggerDbSchema>> => {
    try {
        const { page, typeEvent, dateFrom, dateUntil, userId, limitPage } = opts

        const options: PaginateOptions = {
            page: Number(page),
            limit: Number(limitPage),
            populate: {
                strictPopulate: false,
                path: 'user' // hace referencia al nombre del attr.
            }
        }
        const query: FilterQuery<ILoggerDbSchema> = {
            ...((typeEvent) && {
                type: { $regex: new RegExp(typeEvent), $options: 'i' } //Valida que exista coincidencia de text
            }),
            date: {
                // Mayor o igual que la fecha de inicio
                $gte: moment(dateFrom).unix() * 1000,
                // Menor o igual que la fecha de fin
                $lte: moment(dateUntil).unix() * 1000,
            },
            ...((userId) && { user: userId })
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