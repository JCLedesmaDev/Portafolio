import { tryCatchWrapper } from "@utils/tryCatchWrapper"
import externalDb from './dal'
import { IGetTechnologiesRequest, IGetTechnologiesResponse } from "./dto/getTechnologies"
import { paginationMapper } from "@utils/paginationMapper"
import { ITechnology } from "@interface/ITechnology"
import mappers from "@mappers/index.mappers"
import responseMessage from "@utils/responseMessage"

const getTechnologies = tryCatchWrapper(async (payload: IGetTechnologiesRequest) => {

    const listTechnologies = await externalDb.getTechnologies(payload)

    const listTechnologiesMapper: IGetTechnologiesResponse = paginationMapper<
        ITechnology[]
    >({
        resource: listTechnologies,
        callBackMapper: mappers.multipleTechnologies
    })

    return responseMessage.success<IGetTechnologiesResponse>({
        data: listTechnologiesMapper,
    })
})


export default {
    getTechnologies
}