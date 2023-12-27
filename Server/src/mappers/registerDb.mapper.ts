import { IRegisterDb } from "@interface/index.interfaces";
import { IRegisterDbSchema, IUserSchema } from "@models/ICollections";
import mappers from "./index.mappers";

export const multipleRegisterDb = (docs: IRegisterDbSchema[]): IRegisterDb[] => {
    return docs.map(doc => singleRegisterDb(doc))
}

const singleRegisterDb = (resource: IRegisterDbSchema): IRegisterDb => {
    const mapper: IRegisterDb = {
        id: resource._id,
        date: resource.date,
        request: resource.request,
        response: resource.response,
        type: resource.type,
        user: resource?.user ? mappers.user(resource?.user as IUserSchema) : undefined
    }
    return mapper
};