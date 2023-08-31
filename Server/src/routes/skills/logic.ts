import { tryCatchWrapper } from "@utils/tryCatchWrapper"
import externalDb from './dal'
import { paginationMapper } from "@utils/paginationMapper"
import mappers from "@mappers/index.mappers"
import responseMessage from "@utils/responseMessage"
import { IAddTechnologyRequest } from "./dto/addTechnology.dto"
import { IUpdateTechnologyRequest } from "./dto/updateTechnology.dto"
import { IDeleteTechnologyRequest } from "./dto/deleteTechnology.dto"
import { ApplicationError } from "@utils/applicationError"
import { deleteFile } from "@utils/deleteFile"
import { ISkillSchema, ITechnologySchema } from "@models/ICollections"
import { IGetSkillsRequest, IGetSkillsResponse } from "./dto/getSkills.dto"
import { ISkill } from "@interface/ISkill"


const getSkills = tryCatchWrapper(async (payload: IGetSkillsRequest) => {

//     // const listSkills = await externalDb.getSkills(payload)

//     // const listSkillsMapper: IGetSkillsResponse = paginationMapper<ISkill[]>({
//     //     resource: listSkills,
//     //     callBackMapper: mappers.multipleSkills
//     // })


//     // return responseMessage.success<IGetSkillsResponse>({
//     //     data: listSkillsMapper,
//     // })
//     return "asd" as any
})

const addTechnology = tryCatchWrapper(async (payload: IAddTechnologyRequest) => {

    let skillUser = {} as ISkillSchema | null

    skillUser = await externalDb.findSkillFromUserByFields({
        category: payload.idCategory
    })

    if (skillUser === null) skillUser = await externalDb.addSkillToUser(payload)

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

    const newTechnology = await externalDb.addTechnology(payload);

    externalDb.addTechnologyToSkillToUser({
        category: payload.idCategory,
        user: payload.usrId
    }, newTechnology._id);

    return responseMessage.success({
        message: 'Ha creado una tecnologia exitosamente!',
        data: newTechnology
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
        data: technologyUpdate
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

    await externalDb.deleteTechnologyToSkillToUser({
        category: payload.idCategory,
        user: payload.usrId
    }, payload.idTechnology)
    
    const skillsUser = await externalDb.getSkills(payload.usrId)

    skillsUser?.forEach(async (skill: ISkillSchema) => {
        const technologyList = skill?.technologysList as ITechnologySchema[] 
        if (technologyList?.length === 0) {
            await externalDb.deleteSkillToUser(skill._id, payload.usrId)
        }
    })

    return responseMessage.success({
        message: 'Se elimino correctamente!',
    })
})

/// Faltaria CRUD de categorias

export default {
    getSkills,
    addTechnology,
    updateTechnology,
    deleteTechnology
}