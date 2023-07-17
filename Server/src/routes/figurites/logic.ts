import { tryCatchWrapper } from "../../utils/tryCatchWrapper"
import externalDb from "./dal"
// import mapper from './mapper'
import responseMessage, { IResponse } from "../../utils/responseMessage"
import { ApplicationError } from "../../utils/applicationError"
import { IPaginationResult, paginationMapper } from "../../utils/paginationMapper"
import { ICreateFigurineDto } from "./dto/ICreateFigurine.dto"
import { IDeleteFigurineDto } from "./dto/IDeleteFigurine.dto"
import { IUpdateFigurineDto } from "./dto/IUpdateFigurine.dto"
import { IBuyFigurineDto } from "./dto/IBuyFigurine.dto"



const createFigurine = tryCatchWrapper(async (payload: ICreateFigurineDto) => {

    const findFigurine = await externalDb.findFigurine({
        title: payload.title,
        album: payload.idAlbum
    })

    if (findFigurine !== null) {
        throw new ApplicationError({ message: 'Ya existe una Figurita con este nombre en este Album. Intentelo con otro.' });
    }

    await externalDb.createFigurine(payload)

    return responseMessage.success<any>({
        message: 'Ha creado una figurita exitosamente!'
    })
})

const deleteFigurine = tryCatchWrapper(async (payload: IDeleteFigurineDto) => {

    const album = await externalDb.findFigurine({
        '_id': payload.id
    })

    if (album === null) {
        throw new ApplicationError({ message: 'No existe esta Figurita. Intentelo con otro.' });
    }

    await externalDb.deleteFigurine(payload)

    return responseMessage.success<any>({
        message: 'Ha eliminado un Album exitosamente!'
    })
})

const updateFigurine = tryCatchWrapper(async (payload: IUpdateFigurineDto) => {

    const findFigurine = await externalDb.findFigurine({
        title: payload.title,
        album: payload.idAlbum
    })

    if (findFigurine !== null) {
        throw new ApplicationError({ message: 'No existe esta Figurita. Intentelo con otro.' });
    }

    await externalDb.updateFigurine(payload)

    return responseMessage.success<any>({
        message: 'Ha editado una figurita exitosamente!'
    })
})

const buyFigurine = tryCatchWrapper(async (payload: IBuyFigurineDto) => {

    const findPurchasedAlbum = await externalDb.findPurchasedAlbum({
        idAlbum: payload.idAlbum,
        idUser: payload.idUser
    })

    if (findPurchasedAlbum === null) {
        throw new ApplicationError({ message: 'No tenes comprado el Album de esta Figurita!.' });
    }

    const findPurchasedFigurine = await externalDb.findPurchasedFigurine({
        idFigurine: payload.idFigurine,
        idPurchasedAlbum: findPurchasedAlbum.id
    })

    if (findPurchasedFigurine !== null) {
        throw new ApplicationError({ message: 'Ya has comprado esta figurita antes!.' });
    }

    await externalDb.buyFigurine({
        idFigurine: payload.idFigurine,
        idPurchasedAlbum: findPurchasedAlbum.id
    })

    return responseMessage.success<any>({
        message: 'Compraste esta Figurita!!'        
    })
})

export default {
    createFigurine,
    deleteFigurine,
    updateFigurine,
    buyFigurine
}