import externalDb from './dal'
import externalDbUser from "@src/routes/users/dal"
import mappers from "@mappers/index.mappers"
import responseMessage from "@utils/responseMessage"
import { IAddTechnologyRequest, IAddTechnologyResponse } from "./dto/addTechnology.dto"
import { IUpdateTechnologyRequest, IUpdateTechnologyResponse } from "./dto/updateTechnology.dto"
import { IDeleteTechnologyRequest } from "./dto/deleteTechnology.dto"
import { ApplicationError } from "@utils/applicationError"
import { deleteFile } from "@utils/deleteFile"
import { ISkillSchema, ITechnologySchema } from "@models/ICollections"


const addTechnology = async (payload: IAddTechnologyRequest) => {

    let skillUser = {} as ISkillSchema | null

    skillUser = await externalDb.findSkillFromUserByFields({
        category: payload.idCategory
    })

    if (skillUser === null) {
        skillUser = await externalDb.addNewSkill(payload)
        externalDbUser.addRefSkillToUser(payload.usrId, skillUser._id)
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
}

const updateTechnology = async (payload: IUpdateTechnologyRequest) => {

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
}

const deleteTechnology = async (payload: IDeleteTechnologyRequest) => {
    const findTechnology = await externalDb.findTechnologyByFields({
        _id: payload.idTechnology
    })

    if (findTechnology === null) {
        throw new ApplicationError({
            message: 'Tecnologia inexistente. Intentelo con otro.'
        });
    }

    const technologyDelete = await externalDb.deleteTechnology(payload);

    if (technologyDelete) {
        deleteFile(findTechnology.image)
        externalDb.deleteTechnologyToSkillToUser({
            category: payload.idCategory,
            user: payload.usrId
        }, payload.idTechnology)
    }

    const skillsUser = await externalDb.getSkills(payload.usrId)

    skillsUser?.forEach(async (skill: ISkillSchema) => {
        const technologyList = skill?.technologysList as ITechnologySchema[]
        if (technologyList?.length === 0) {
            await externalDbUser.deleteRefSkillToUser(skill._id, payload.usrId)
            externalDb.deleteSkill(skill._id)
        }
    })

    return responseMessage.success({
        message: 'Se elimino correctamente!',
    })
}


export default {
    addTechnology,
    updateTechnology,
    deleteTechnology
}