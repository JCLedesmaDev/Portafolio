/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILoggerDB } from '@/models/ILoggerDB.model';

const singleLoggerDb = (resource: any): ILoggerDB => {
    const mapper: ILoggerDB = {
        Fecha: resource.date,
        Usuario: resource.user,
        Tipo: resource.type,
        Request: resource.request,
        Response: resource.response
    }
    return mapper
}

export const loggerDb = (resource: any[]): ILoggerDB[] => {
    return resource.map(x => singleLoggerDb(x))
}