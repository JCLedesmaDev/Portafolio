import collections from "@models/index.collections";
import { ICategorySchema } from "@models/ICollections"
import { ApplicationError } from "@utils/index.utils";
import { IAddCaterogyRequest } from "./dto/addCategory.dto";
import { IUpdateCategoryRequest } from "./dto/updateCategory.dto.";


const getAll = async (): Promise<ICategorySchema[]> => {
    try {
        return await collections.Category.find({})
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al obtener las categorias',
            source: error
        });
    }
}

const findCategoryByField = async (objFind: any): Promise<ICategorySchema | null> => {
    try {
        return await collections.Category.findOne(objFind)
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al obtener la categoria',
            source: error
        });
    }
}

const addNewCategory = async (payload: IAddCaterogyRequest): Promise<ICategorySchema> => {
    try {
        return await collections.Category.create({
            name: payload.name,
        })
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al agregar la categoria.',
            source: error
        })
    }
}

const deleteCategory = async (idCategory: string): Promise<boolean> => {
    try {
        const newSkill = await collections.Category.deleteById(idCategory)
        return newSkill.deletedCount === 1
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al eliminar.',
            source: error
        })
    }
}

const updateCategory = async (payload: IUpdateCategoryRequest): Promise<ICategorySchema | null> => {
    try {
        return await collections.Category.findByIdAndUpdate(
            payload.idCategory,
            { name: payload.name, },
            { new: true }
        )
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al actualziar esta categoria',
            source: error
        })
    }
}

export default {
    getAll,
    findCategoryByField,
    addNewCategory,
    deleteCategory,
    updateCategory
}