import { tryCatchWrapper } from "../../utils/tryCatchWrapper"
import externalDb from "./dal"
import mapper from './mapper'
import responseMessage from "../../utils/responseMessage"
import { IPagination } from "../../interface/IPagination"
import { ApplicationError } from "../../utils/applicationError"
import { IPaginationResult, paginationMapper } from "../../utils/paginationMapper"
import { ICreateCollectionDto } from "./dto/ICreateCollection.dto"
import { IDeleteCollectionDto } from "./dto/IDeleteCollection.dto"
import { IUpdateCollectionDto } from "./dto/IUpdateCollection.dto"
import { IAlbumCollection } from "../../interface/IAlbumCollection"

const createCollection = tryCatchWrapper(async (payload: ICreateCollectionDto) => {

    const findAlbum = await externalDb.findCollection({
        'title': payload.title
    })

    if (findAlbum !== null) {
        throw new ApplicationError({ message: 'Ya existe una colleccion con este nombre. Intentelo con otro.' });
    }

    await externalDb.createCollection(payload)

    return responseMessage.success<any>({
        message: 'Ha creado una coleccion exitosamente!'
    })
})

const getAllCollections = tryCatchWrapper(async (payload: IPagination) => {

    const listCollections = await externalDb.getListCollections(payload)

    const listCollectionMapper: IPaginationResult<IAlbumCollection[]> = paginationMapper<IAlbumCollection[]>({
        resource: listCollections,
        callBackMapper: mapper.multipleCollections
    })

    return responseMessage.success<typeof listCollectionMapper>({
        data: listCollectionMapper,
    })
})

const deleteCollection = tryCatchWrapper(async (payload: IDeleteCollectionDto) => {
    const album = await externalDb.findCollection({
        '_id': payload.id
    })

    if (album === null) {
        throw new ApplicationError({ message: 'No existe esta coleccion. Intentelo con otro.' });
    }

    await externalDb.deleteCollection(payload.id)

    return responseMessage.success<any>({
        message: 'Ha eliminado esta coleccion exitosamente!'
    })
})

const updateCollection = tryCatchWrapper(async (payload: IUpdateCollectionDto) => {
    const album = await externalDb.findCollection({
        '_id': payload.id
    })

    if (album === null) {
        throw new ApplicationError({ message: 'No existe esta coleccion. Intentelo con otro.' });
    }

    await externalDb.updateCollection(payload)

    return responseMessage.success<any>({
        message: 'Actualizaste esta coleccion exitosamente!'
    })
})

export default {
    createCollection, 
    getAllCollections,
    deleteCollection,
    updateCollection
}