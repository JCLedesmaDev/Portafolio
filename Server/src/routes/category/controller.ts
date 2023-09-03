import { controllerWrapper } from "@utils/controllerWrapper";
import { matchedData } from "express-validator"
import { Request } from "express"
import logic from './logic'
import {  IAddCaterogyRequest } from "./dto/addCategory.dto";
import { IDeleteCategoryRequest } from "./dto/deleteCategory.dto";
import { IUpdateCategoryRequest } from "./dto/updateCategory.dto.";

const getAll = controllerWrapper(async (req: Request) => {
    return await logic.getAll()
});

const addCategory = controllerWrapper(async (req: Request) => {
    const payload = matchedData(req) as IAddCaterogyRequest;
    payload.usrId = req.locals.usrId

    req.locals.info = payload;
    return await logic.addCategory(payload)
});

const updateCategory = controllerWrapper(async (req: Request) => {
    const payload = matchedData(req) as IUpdateCategoryRequest;
    payload.usrId = req.locals.usrId

    req.locals.info = payload;
    return await logic.updateCategory(payload)
});

const deleteCategory = controllerWrapper(async (req: Request) => {
    const payload = matchedData(req) as IDeleteCategoryRequest;
    payload.usrId = req.locals.usrId

    req.locals.info = payload;
    return await logic.deleteCategory(payload)
});


export {
    getAll,
    addCategory,
    updateCategory,
    deleteCategory
}