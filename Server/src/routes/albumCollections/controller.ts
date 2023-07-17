import { Request, Response, NextFunction } from "express"
import { matchedData } from "express-validator"
import { IPagination } from "../../interface/IPagination"
import { controllerWrapper } from "../../utils/controllerWrapper"
import { ICreateCollectionDto } from "./dto/ICreateCollection.dto"
import { IDeleteCollectionDto } from "./dto/IDeleteCollection.dto"
import { IUpdateCollectionDto } from "./dto/IUpdateCollection.dto"
import logic from './logic'


const createCollection = controllerWrapper(async (req: Request) => {
    const payload: ICreateCollectionDto = matchedData(req) as ICreateCollectionDto

    req.locals.info = payload
    return await logic.createCollection(payload)
})

const getAllCollections = controllerWrapper(async (req: Request) => {

    const payload = {
        page: req.query.page || 1,
        filterText: req.query.filterText
    } as IPagination

    req.locals.info = payload
    return await logic.getAllCollections(payload)
})

const deleteCollection = controllerWrapper(async (req: Request) => {

    const payload: IDeleteCollectionDto = matchedData(req) as IDeleteCollectionDto

    req.locals.info = { idAlbum: payload }
    return await logic.deleteCollection(payload)
})

const updateCollection = controllerWrapper(async (req: Request) => {
    const payload: IUpdateCollectionDto = matchedData(req) as IUpdateCollectionDto

    req.locals.info = payload
    return await logic.updateCollection(payload)
})



export {
    createCollection,
    getAllCollections,
    deleteCollection,
    updateCollection
}