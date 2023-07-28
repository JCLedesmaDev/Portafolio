import { tryCatchWrapper } from "@utils/tryCatchWrapper"
import externalDb from './dal'
import { IGetTechnologiesRequest, IGetTechnologiesResponse } from "./dto/getTechnologies.dto"
import { paginationMapper } from "@utils/paginationMapper"
import mappers from "@mappers/index.mappers"
import responseMessage from "@utils/responseMessage"
import { ICreateTechnologyRequest } from "./dto/createTechnology.dto"
import { IUpdateTechnologyRequest } from "./dto/updateTechnology.dto"
import { IDeleteTechnologyRequest } from "./dto/deleteTechnology.dto"
import { ApplicationError } from "@utils/applicationError"
import { deleteFile } from "@utils/deleteFile"


const getTechnologies = tryCatchWrapper(async (
    payload: IGetTechnologiesRequest
) => {

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

const createTechnology = tryCatchWrapper(async (payload: ICreateTechnologyRequest) => {
    const findTechnology = await externalDb.findTechnologyByFields({
        name: payload.name
    })

    if (findTechnology !== null) {
        throw new ApplicationError({
            message: 'Ya existe una tecnologia con este nombre. Intentelo con otro.'
        });
    }

    const fndCategory = await externalDb.findCategoryByFields({
        _id: payload.idCategory
    })

    if (fndCategory === null) {
        throw new ApplicationError({
            message: 'Categoria inexistente. Intentelo con otro.'
        });
    }

    await externalDb.createTechnology(payload)

    return responseMessage.success({
        message: 'Ha creado una tecnologia exitosamente!'
    })
})

const updateTechnology = tryCatchWrapper(async (payload: IUpdateTechnologyRequest) => {
    const findTechnology = await externalDb.findTechnologyByFields({
        name: payload.name
    })

    if (findTechnology === null) {
        throw new ApplicationError({
            message: 'Tecnologia inexistente. Intentelo con otro.'
        });
    }

    const fndCategory = await externalDb.findCategoryByFields({
        _id: payload.idCategory
    })

    if (fndCategory === null) {
        throw new ApplicationError({
            message: 'Categoria inexistente. Intentelo con otro.'
        });
    }

    const technologyUpdate = await externalDb.updateTechnology(payload)
    if (technologyUpdate && payload.image && findTechnology.image !== '') {
        deleteFile(findTechnology.image)
    }

    return responseMessage.success({
        message: 'Se edito correctamente!',
    })
})

const deleteTechnology = tryCatchWrapper(async (payload: IDeleteTechnologyRequest) => {
    const findTechnology = await externalDb.findTechnologyByFields({
        _id: payload.idTechnology
    })

    if (findTechnology === null) {
        throw new ApplicationError({
            message: 'Tecnologia inexistente. Intentelo con otro.'
        });
    }

    const technologyDelete = await externalDb.deleteTechnology(payload);

    if (technologyDelete) deleteFile(findTechnology.image)

    return responseMessage.success({
        message: 'Se elimino correctamente!',
    })
})

export default {
    getTechnologies,
    createTechnology,
    updateTechnology,
    deleteTechnology
}