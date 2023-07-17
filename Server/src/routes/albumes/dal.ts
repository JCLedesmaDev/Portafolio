import { FilterQuery, PaginateOptions, PaginateResult, Types } from "mongoose"
import { IPagination } from "../../interface/IPagination"
import { IAlbumSchema } from "../../models/collections/Albumes"
import { IPurchasedAlbumSchema } from "../../models/collections/PurchasedAlbumes"
import collections from "../../models/index.collections"
import { ApplicationError } from "../../utils/applicationError"
import { IBuyAlbumDto } from "./dto/IBuyAlbum.dto"
import { ICreateAlbumDto } from "./dto/ICreateAlbum.dto."
import { IGetAllPurchasedAlbumesDto } from "./dto/IGetAllPurchasedAlbumes.dto"
import { IUpdateAlbumDto } from "./dto/IUpdateAlbum.dto"


const createAlbum = async (payload: ICreateAlbumDto): Promise<IAlbumSchema> => {
    try {
        const newAlbum = await collections.Albumes.create({
            albumCollections: new Types.ObjectId(payload.idCollection),
            image: payload.image,
            title: payload.title
        })

        await collections.AlbumCollections.findByIdAndUpdate(payload.idCollection, {
            $push: { albumes: new Types.ObjectId(newAlbum._id) }
        })

        return newAlbum
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al crear un Album', source: error })
    }
}

const findAlbum = async (objFind: any): Promise<IAlbumSchema | null> => {
    try {
        return await collections.Albumes.findOne(objFind)
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al encontrar este Album', source: error })
    }
}

const getListAlbumes = async ({ page, filterText }: IPagination): Promise<PaginateResult<IAlbumSchema>> => {
    try {
        const options: PaginateOptions = {
            page,
            limit: 3,
            populate: { strictPopulate: false, path: 'figurites' }
        }
        const query: FilterQuery<IAlbumSchema> = {
            ...(filterText !== '' && {
                title: { $regex: new RegExp(filterText), $options: 'i' }
            }),
        }
        return await collections.Albumes.paginate(query, options)
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al obtener el listado de albumes', source: error })
    }
}

const deleteAlbum = async (payload: string): Promise<any> => {
    try {
        return await collections.Albumes.deleteById(payload)
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al eliminar este album', source: error })
    }
}

const updateAlbum = async (payload: IUpdateAlbumDto): Promise<IAlbumSchema | null> => {
    try {
        return await collections.Albumes.findByIdAndUpdate(payload.id, {
            title: payload.title,
            image: payload.image,
            collectionAlbum: new Types.ObjectId(payload.idCollection)
        })
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al actualziar este album', source: error })
    }
}

const findPurchasedAlbum = async (payload: IBuyAlbumDto): Promise<IPurchasedAlbumSchema | null> => {
    try {
        return await collections.PurchasedAlbumes.findOne({
            albumRef: payload.idAlbum,
            user: payload.idUser
        })
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al verificar la compra del Album', source: error })
    }
}

const buyAlbum = async (payload: IBuyAlbumDto): Promise<IPurchasedAlbumSchema> => {
    try {
        return await collections.PurchasedAlbumes.create({
            albumRef: new Types.ObjectId(payload.idAlbum),
            user: new Types.ObjectId(payload.idUser)
        })
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al comprar este Album', source: error })
    }
}

const getAllPurchasedAlbumes = async (payload: IGetAllPurchasedAlbumesDto): Promise<PaginateResult<IPurchasedAlbumSchema>> => {
    try {
        const options: PaginateOptions = {
            page: payload.page,
            limit: 3,
            populate: [
                { strictPopulate: false, path: 'albumRef' },
                { // Hacmeos populate de purchasedFigures
                    strictPopulate: false, path: 'purchasedFigures', populate: {
                        // Hacmeos populate de las figurineRef que tiene un purchasedFigures
                        path: 'figurineRef', strictPopulate: false,
                    }
                }
            ],
        }
        const query: FilterQuery<IPurchasedAlbumSchema> = {
            ...(payload.filterText !== '' && {
                'albumRef.title': { $regex: new RegExp(payload.filterText), $options: 'i' }
            }),
        }
        return await collections.PurchasedAlbumes.paginate(query, options)
    } catch (error) {
        throw new ApplicationError({ message: 'Ha ocurrido un error al obtener el listado de albumes', source: error })
    }
}

export default {
    createAlbum,
    findAlbum,
    getListAlbumes,
    deleteAlbum,
    updateAlbum,
    findPurchasedAlbum,
    buyAlbum,
    getAllPurchasedAlbumes
}