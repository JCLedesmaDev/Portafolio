import mappers from "@mappers/index.mappers";
import responseMessage from "@utils/responseMessage";
import externalDb from './dal'
import { IRegisterDb } from "@interface/index.interfaces";
import {
    IGetAllLoggerDbRequest,
    IGetAllLoggerDbResponse
} from "./dto/getAllLoggerDb.dto";


const getAllLogerDb = async (payload: IGetAllLoggerDbRequest) => {

    const listRegisterDb = await externalDb.getAllLogerDb(payload)

    const listRegisterDbMapper = mappers.pagination<IRegisterDb[]>({
        resource: listRegisterDb,
        callBackMapper: mappers.multipleLoggerDb
    })

    return responseMessage.success<IGetAllLoggerDbResponse>({
        data: listRegisterDbMapper
    })
}

export default { getAllLogerDb }