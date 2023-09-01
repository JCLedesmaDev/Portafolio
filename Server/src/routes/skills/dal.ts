import collections from "@models/index.collections"
import { ApplicationError } from "@utils/applicationError";
import { ICategorySchema, ISkillSchema, ITechnologySchema } from "@models/ICollections";
import { Types } from "mongoose";
import { IAddTechnologyRequest } from "./dto/addTechnology.dto";
import config from 'config'
import { IUpdateTechnologyRequest } from "./dto/updateTechnology.dto";
import { IDeleteTechnologyRequest } from "./dto/deleteTechnology.dto";

const getSkills = async (usrId: string): Promise<ISkillSchema[]> => {
    try {
        return await collections.Skill.find({
            user: new Types.ObjectId(usrId)
        }).populate([
            { strictPopulate: false, path: 'Technology' },
            { strictPopulate: false, path: 'Category' }
        ])
    } catch (error) {
        throw new ApplicationError({
            message: 'Ocurrio un error al obtener las tecnologias', source: error
        });
    }
}

const addNewSkill = async (payload: IAddTechnologyRequest): Promise<ISkillSchema> => {
    try {
        return await collections.Skill.create({
            technologysList: [],
            category: new Types.ObjectId(payload.idCategory),
            user: new Types.ObjectId(payload.usrId)
        })
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al agregar.',
            source: error
        })
    }
}

const deleteSkill = async (idSkill: string, usrId: string): Promise<boolean> => {
    try {
        // await collections.User.findByIdAndUpdate(usrId, {
        //     $pull: { skillsList: new Types.ObjectId(idSkill) }
        // })
        const newSkill = await collections.Skill.deleteById(idSkill)
        return newSkill.deletedCount === 1
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al eliminar.',
            source: error
        })
    }
}

const addTechnologyToSkillToUser = async (objFind: any, idTechnology: string) => {
    try {
        await collections.Skill.findOneAndUpdate(objFind, {
            $push: { technologysList: new Types.ObjectId(idTechnology) }
        })
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al actualziar esta habilidad',
            source: error
        })
    }
}

const deleteTechnologyToSkillToUser = async (objFind: any, idTechnology: string) => {
    try {
        await collections.Skill.findOneAndUpdate(objFind, {
            $pull: { technologysList: new Types.ObjectId(idTechnology) }
        })
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al actualziar esta habilidad',
            source: error
        })
    }
}

const findSkillFromUserByFields = async (objFind: any): Promise<ISkillSchema | null> => {
    try {
        return await collections.Skill.findOne(objFind)
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al obtener la habilidad del usuario',
            source: error
        });
    }
}


//////// TECNOLOGIA

const addTechnology = async (payload: IAddTechnologyRequest): Promise<ITechnologySchema> => {
    try {

        return await collections.Technology.create({
            name: payload.name,
            image: `${config.get('server.public_url')}/${payload.image[0].filename}`,
            category: new Types.ObjectId(payload.idCategory),
            user: new Types.ObjectId(payload.usrId)
        })
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al crear una tecnologia',
            source: error
        })
    }
}
const findTechnologyByFields = async (objFind: any): Promise<ITechnologySchema | null> => {
    try {
        return await collections.Technology.findOne(objFind)
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al obtener la tecnologia',
            source: error
        });
    }
}
const updateTechnology = async (payload: IUpdateTechnologyRequest): Promise<ITechnologySchema | null> => {
    try {
        return await collections.Technology.findByIdAndUpdate(
            payload.idTechnology,
            {
                name: payload.name,
                image: payload.image,
                category: new Types.ObjectId(payload.idCategory)
            }
        )
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al actualziar esta tecnologia',
            source: error
        })
    }
}
const deleteTechnology = async (payload: IDeleteTechnologyRequest): Promise<boolean> => {
    try {
        const techDelete = await collections.Technology.deleteById(payload.idTechnology)
        return techDelete.deletedCount === 1
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al eliminar este album', source: error })
    }
}

//////// CATEGORIA

const findCategoryByFields = async (objFind: any): Promise<ICategorySchema | null> => {
    try {
        return await collections.Category.findOne(objFind)
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al obtener la categoria',
            source: error
        });
    }
}

export default {
    // skills
    getSkills,
    addNewSkill,
    deleteSkill,
    addTechnologyToSkillToUser,
    deleteTechnologyToSkillToUser,
    findSkillFromUserByFields,

    // technology
    addTechnology,
    updateTechnology,
    deleteTechnology,
    findTechnologyByFields,

    // categoty
    findCategoryByFields
}


// const getTechnologies = async (
//     payload: IGetTechnologiesRequest
// ): Promise<PaginateResult<ITechnologySchema>> => {
//     try {
//         const query: FilterQuery<ITechnologySchema> = {
//             _id: payload.usrId
//         }
//         const options: PaginateOptions = {
//             page: payload.page,
//             limit: 6,
//             populate: { strictPopulate: false, path: 'Categories' }
//         }

//         return await collections.Technologies.paginate(query, options)
//     } catch (error) {
//         throw new ApplicationError({
//             message: 'Ocurrio un error al obtener las tecnologias', source: error
//         });
//     }
// }