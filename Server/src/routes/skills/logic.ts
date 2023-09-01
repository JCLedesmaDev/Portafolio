import { tryCatchWrapper } from "@utils/tryCatchWrapper"
import externalDb from './dal'
import externalDbUser from '@src/routes/users/dal'
import mappers from "@mappers/index.mappers"
import responseMessage from "@utils/responseMessage"
import { IAddTechnologyRequest, IAddTechnologyResponse } from "./dto/addTechnology.dto"
import { IUpdateTechnologyRequest, IUpdateTechnologyResponse } from "./dto/updateTechnology.dto"
import { IDeleteTechnologyRequest } from "./dto/deleteTechnology.dto"
import { ApplicationError } from "@utils/applicationError"
import { deleteFile } from "@utils/deleteFile"
import { ISkillSchema, ITechnologySchema } from "@models/ICollections"
import { IGetSkillsRequest, IGetSkillsResponse } from "./dto/getSkills.dto"


const getSkills = tryCatchWrapper(async (payload: IGetSkillsRequest) => {

    const listSkills = await externalDb.getSkills(payload.usrId)

    const response: IGetSkillsResponse = {
        listSkills: mappers.multipleSkills(listSkills)
    }

    return responseMessage.success<IGetSkillsResponse>({
        data: response,
    })
})

const addTechnology = tryCatchWrapper(async (payload: IAddTechnologyRequest) => {

    let skillUser = {} as ISkillSchema | null

    skillUser = await externalDb.findSkillFromUserByFields({
        category: payload.idCategory
    })

    if (skillUser === null) {
        skillUser = await externalDb.addNewSkill(payload)
        await externalDbUser.addSkillToUser(payload.usrId, skillUser._id)
    }

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


    const response: IAddTechnologyResponse = {
        technology: mappers.singleTechnology(newTechnology)
    }

    return responseMessage.success<IAddTechnologyResponse>({
        message: 'Ha creado una tecnologia exitosamente!',
        data: response
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

    const response: IAddTechnologyResponse = {
        technology: mappers.singleTechnology(technologyUpdate as ITechnologySchema)
    }

    return responseMessage.success<IUpdateTechnologyResponse>({
        message: 'Se edito correctamente!',
        data: response
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
            await externalDbUser.deleteSkillToUser(skill._id, payload.usrId)
            await externalDb.deleteSkill(skill._id, payload.usrId)
        }
    })

    return responseMessage.success({
        message: 'Se elimino correctamente!',
    })
})


export default {
    getSkills,
    addTechnology,
    updateTechnology,
    deleteTechnology
}