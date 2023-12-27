import mappers from "@mappers/index.mappers";
import responseMessage from "@utils/responseMessage";
import { tryCatchWrapper } from "@utils/tryCatchWrapper";
import externalDb from './dal'
import { IFilterPagination, IRegisterDb } from "@interface/index.interfaces";
import { IGetAllLogerDbResponse } from "./dto/getAllLoggerDb.dto";


const getAllLogerDb = tryCatchWrapper(async (payload: IFilterPagination) => {

    const listRegisterDb = await externalDb.getAllLogerDb(payload)

    const listRegisterDbMapper: IGetAllLogerDbResponse = mappers.pagination<IRegisterDb[]>({
        resource: listRegisterDb,
        callBackMapper: mappers.multipleRegisterDb
    })

    return responseMessage.success<IGetAllLogerDbResponse>({
        data: listRegisterDbMapper
    })
})


export default { getAllLogerDb }