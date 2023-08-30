import { tryCatchWrapper } from "@utils/tryCatchWrapper"
import externalDb from './dal'
import { paginationMapper } from "@utils/paginationMapper"
import mappers from "@mappers/index.mappers"
import responseMessage from "@utils/responseMessage"
import { ICreateTechnologyRequest } from "./dto/createTechnology.dto"
import { IUpdateTechnologyRequest } from "./dto/updateTechnology.dto"
import { IDeleteTechnologyRequest } from "./dto/deleteTechnology.dto"
import { ApplicationError } from "@utils/applicationError"
import { deleteFile } from "@utils/deleteFile"
import { ISkillSchema } from "@models/ICollections"
import { IGetSkillsRequest, IGetSkillsResponse } from "./dto/getSkills.dto"
import { ISkill } from "@interface/ISkill"


const getSkills = tryCatchWrapper(async (payload: IGetSkillsRequest) => {

    // const listSkills = await externalDb.getSkills(payload)

    // const listSkillsMapper: IGetSkillsResponse = paginationMapper<ISkill[]>({
    //     resource: listSkills,
    //     callBackMapper: mappers.multipleSkills
    // })


    // return responseMessage.success<IGetSkillsResponse>({
    //     data: listSkillsMapper,
    // })
    return "asd" as any
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

/// Faltaria CRUD de categorias

export default {
    getSkills,
    createTechnology,
    updateTechnology,
    deleteTechnology
}