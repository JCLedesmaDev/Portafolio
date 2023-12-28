import { IRegisterDb } from "@interface/index.interfaces";
import { ILoggerDbSchema, IUserSchema } from "@models/ICollections";
import mappers from "./index.mappers";

export const multipleLoggerDb = (docs: ILoggerDbSchema[]): IRegisterDb[] => {
    return docs.map(doc => singleLoggerDb(doc))
}

const singleLoggerDb = (resource: ILoggerDbSchema): IRegisterDb => {
    const mapper: IRegisterDb = {
        id: resource._id,
        date: resource.date,
        request: resource.request,
        url: resource.url,
        method: resource.method,
        response: resource.response,
        type: resource.type,
        user: resource?.user
            ? mappers.user(resource?.user as IUserSchema).email
            : 'Anonimo'
    }
    return mapper
};