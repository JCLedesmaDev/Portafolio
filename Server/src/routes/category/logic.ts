import mappers from "@mappers/index.mappers";
import responseMessage from "@utils/responseMessage";
import { ApplicationError } from "@utils/applicationError";
import externalDb from './dal'
import { ICategorySchema } from "@models/ICollections";
import { IAddCategoryResponse, IAddCaterogyRequest } from "./dto/addCategory.dto";
import { IDeleteCategoryRequest } from "./dto/deleteCategory.dto";
import { IUpdateCategoryRequest, IUpdateCategoryResponse } from "./dto/updateCategory.dto.";
import { IGetCategoryResponse } from "./dto/getCategory.dto";


const getAll = async () => {

    const listCategories = await externalDb.getAll()

    const response: IGetCategoryResponse = {
        listCategories: mappers.multipleCategories(listCategories)
    }

    return responseMessage.success<IGetCategoryResponse>({
        data: response
    })
}

const addCategory = async (payload: IAddCaterogyRequest) => {
    const fndProject = await externalDb.findCategoryByField({
        name: payload.name
    })

    if (fndProject === null) throw new ApplicationError({
        message: 'Ya existe una categoria con este nombre. Intentelo nuevamente'
    })


    const newProject = await externalDb.addNewCategory(payload)

    const response: IAddCategoryResponse = {
        category: mappers.singleCategory(newProject)
    }

    return responseMessage.success<IAddCategoryResponse>({
        message: 'Ha creado una categoria exitosamente!',
        data: response
    })
}

const deleteCategory = async (payload: IDeleteCategoryRequest) => {
    const fndProject = await externalDb.findCategoryByField({
        _id: payload.idCategory
    })

    if (fndProject === null) throw new ApplicationError({
        message: 'No existe una categoria con este nombre. Intentelo nuevamente'
    })


    await externalDb.deleteCategory(payload.idCategory);

    return responseMessage.success({
        message: 'Se elimino correctamente!',
    })
}

const updateCategory = async (payload: IUpdateCategoryRequest) => {
    const fndProject = await externalDb.findCategoryByField({
        _id: payload.idCategory
    })

    if (fndProject === null) throw new ApplicationError({
        message: 'No existe una categoria con este nombre. Intentelo nuevamente'
    })


    const categoryUpdate = await externalDb.updateCategory(payload)


    const response: IUpdateCategoryResponse = {
        category: mappers.singleCategory(categoryUpdate as ICategorySchema)
    }

    return responseMessage.success<IUpdateCategoryResponse>({
        message: 'Se edito exitosamente!',
        data: response
    })
}

export default {
    getAll,
    addCategory,
    updateCategory,
    deleteCategory
}