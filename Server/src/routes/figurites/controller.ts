import { Request, Response, NextFunction } from "express"
import { matchedData } from "express-validator"
import { controllerWrapper } from "../../utils/controllerWrapper"
import { IBuyFigurineDto } from "./dto/IBuyFigurine.dto"
import { ICreateFigurineDto } from "./dto/ICreateFigurine.dto"
import { IDeleteFigurineDto } from "./dto/IDeleteFigurine.dto"
import { IUpdateFigurineDto } from "./dto/IUpdateFigurine.dto"
import logic from './logic'


const createFigurine = controllerWrapper(async (req: Request) => {
    const payload: ICreateFigurineDto = matchedData(req) as ICreateFigurineDto

    req.locals.info = payload
    return await logic.createFigurine(payload)
})

const deleteFigurine = controllerWrapper(async (req: Request) => {
    const payload: IDeleteFigurineDto = matchedData(req) as IDeleteFigurineDto

    req.locals.info = payload
    return await logic.deleteFigurine(payload)
})

const updateFigurine = controllerWrapper(async (req: Request) => {
    const payload: IUpdateFigurineDto = matchedData(req) as IUpdateFigurineDto

    req.locals.info = payload
    return await logic.updateFigurine(payload)
})

const buyFigurine = controllerWrapper(async (req: Request) => {
    const payload: IBuyFigurineDto = matchedData(req) as IBuyFigurineDto
    payload.idUser = req.locals.usrId

    req.locals.info = payload
    return await logic.buyFigurine(payload)
})



export {
    createFigurine,
    deleteFigurine,
    updateFigurine,
    buyFigurine
}