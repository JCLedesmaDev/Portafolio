import { tryCatchWrapper } from "../../utils/tryCatchWrapper"
import externalDb from "./dal"
import * as mapper from './mapper'
import responseMessage from "../../utils/responseMessage"
import { IPagination } from "../../interface/IPagination"
import { ApplicationError } from "../../utils/applicationError"
import { IPaginationResult, paginationMapper } from "../../utils/paginationMapper"
import { ICreateAlbumDto } from "./dto/ICreateAlbum.dto."
import { IDeleteAlbumDto } from "./dto/IDeleteAlbum.dto"
import { IUpdateAlbumDto } from "./dto/IUpdateAlbum.dto"
import { IAlbum } from "../../interface/IAlbum"
import { IBuyAlbumDto } from "./dto/IBuyAlbum.dto"
import { IGetAllPurchasedAlbumesDto } from "./dto/IGetAllPurchasedAlbumes.dto"
import { IPurchasedAlbum } from "../../interface/IPurchasedAlbum"
import { IGetAlbumDto } from "./dto/IGetAlbum.dto"


const createAlbum = tryCatchWrapper(async (payload: ICreateAlbumDto) => {

    const findAlbum = await externalDb.findAlbum({
        'title': payload.title
    })

    if (findAlbum !== null) {
        throw new ApplicationError({ message: 'Ya existe un Album con este nombre. Intentelo con otro.' });
    }

    await externalDb.createAlbum(payload)

    return responseMessage.success<any>({
        message: 'Ha creado un Album exitosamente!'
    })
})

const getListAlbumes = tryCatchWrapper(async (payload: IPagination) => {

    const listAlbumes = await externalDb.getListAlbumes(payload)

    const listAlbumesMapper: IPaginationResult<IAlbum[]> = paginationMapper<IAlbum[]>({
        resource: listAlbumes,
        callBackMapper: mapper.multipleAlbums
    })

    return responseMessage.success<typeof listAlbumesMapper>({
        data: listAlbumesMapper
    })
})

const getAlbum = tryCatchWrapper(async (payload: IGetAlbumDto) => {

    const findAlbum = await externalDb.findAlbum({ '_id': payload.idAlbum })

    if (findAlbum === null) {
        throw new ApplicationError({ message: 'No existe un Album con este nombre. Intentelo con otro.' });
    }
    const albumMapper: IAlbum = mapper.singleAlbum(findAlbum)

    return responseMessage.success<typeof albumMapper>({
        data: albumMapper
    })
})



const deteleAlbum = tryCatchWrapper(async (payload: IDeleteAlbumDto) => {
    const album = await externalDb.findAlbum({
        '_id': payload.id
    })

    if (album === null) {
        throw new ApplicationError({ message: 'No existe este Album. Intentelo con otro.' });
    }

    await externalDb.deleteAlbum(payload.id)

    return responseMessage.success<any>({
        message: 'Ha eliminado un Album exitosamente!'
    })
})

const updateAlbum = tryCatchWrapper(async (payload: IUpdateAlbumDto) => {
    const album = await externalDb.findAlbum({
        '_id': payload.id
    })

    if (album === null) {
        throw new ApplicationError({ message: 'No existe este Album. Intentelo con otro.' });
    }

    await externalDb.updateAlbum(payload)

    return responseMessage.success<any>({
        message: 'Ha actualizado un Album exitosamente!'
    })
})


const buyAlbum = tryCatchWrapper(async (payload: IBuyAlbumDto) => {
    const album = await externalDb.findAlbum({
        '_id': payload.idAlbum
    })

    if (album === null) {
        throw new ApplicationError({ message: 'No existe este Album. Intentelo con otro.' });
    }

    const findPurchasedAlbum = await externalDb.findPurchasedAlbum(payload)

    if (findPurchasedAlbum !== null) {
        throw new ApplicationError({ message: 'Ya compraste este Album!.' });
    }

    await externalDb.buyAlbum(payload)

    return responseMessage.success<any>({
        message: 'Compraste este Album!!'
    })
})

const getAllPurchasedAlbumes = tryCatchWrapper(async (payload: IGetAllPurchasedAlbumesDto) => {

    const listPurchasedAlbumes = await externalDb.getAllPurchasedAlbumes(payload)

    const listAlbumesMapper: IPaginationResult<IPurchasedAlbum> = paginationMapper<IPurchasedAlbum>({
        resource: listPurchasedAlbumes,
        callBackMapper: mapper.multiplePurchasedAlbumes
    })

    return responseMessage.success<typeof listAlbumesMapper>({
        data: listAlbumesMapper
    })
})

export default {
    createAlbum,
    getListAlbumes,
    getAlbum,
    deteleAlbum,
    updateAlbum,
    buyAlbum,
    getAllPurchasedAlbumes
}