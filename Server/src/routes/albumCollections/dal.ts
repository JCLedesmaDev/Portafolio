import { FilterQuery, PaginateOptions, PaginateResult, Types } from "mongoose"
import { IPagination } from "../../interface/IPagination"
import AlbumCollections, { IAlbumCollectionSchema } from "../../models/collections/AlbumCollections"
import collections from "../../models/index.collections"
import { ApplicationError } from "../../utils/applicationError"
import { ICreateCollectionDto } from "./dto/ICreateCollection.dto"
import { IUpdateCollectionDto } from "./dto/IUpdateCollection.dto"


const createCollection = async (payload: ICreateCollectionDto): Promise<IAlbumCollectionSchema> => {
    try {
        return await collections.AlbumCollections.create({
            title: payload.title,
        })
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al crear esta coleccion', source: error })
    }
}

const findCollection = async (objFind: any): Promise<IAlbumCollectionSchema | null> => {
    try {
        return await collections.AlbumCollections.findOne(objFind)
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al encontrar esta coleccion', source: error })
    }
}

const getListCollections = async ({ page, filterText }: IPagination): Promise<PaginateResult<IAlbumCollectionSchema>> => {
    try {
        const options: PaginateOptions = {
            page,
            limit: 3,
            populate: { strictPopulate: false, path: 'albumes' }
        }
        const query: FilterQuery<IAlbumCollectionSchema> = {
            ...(filterText && {
                title: { $regex: new RegExp(filterText), $options: 'i' }
            }),
        }

        return await collections.AlbumCollections.paginate(query, options)
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al obtener el listado de colecciones', source: error })
    }
}

const deleteCollection = async (payload: string): Promise<any> => {
    try {
        return await collections.AlbumCollections.deleteById(payload)
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al eliminar esta coleccion', source: error })
    }
}

const updateCollection = async (payload: IUpdateCollectionDto): Promise<IAlbumCollectionSchema | null> => {
    try {
        return await collections.AlbumCollections.findByIdAndUpdate(payload.id, {
            title: payload.title
        })
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al actualizar esta coleccionn', source: error })
    }
}

export default {
    findCollection,
    createCollection,
    getListCollections,
    deleteCollection,
    updateCollection
}