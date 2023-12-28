/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILoggerDB } from '@/models/ILoggerDB.model';

const singleLoggerDb = (resource: any): ILoggerDB => {
    const mapper: ILoggerDB = {
        Tipo: resource.type,
        Fecha: resource.date,
        Usuario: resource.user,
        Metodo: resource.method,
        Url: resource.url,
        Request: resource.request,
        Response: resource.response
    }
    return mapper
}

export const loggerDb = (resource: any[]): ILoggerDB[] => {
    return resource.map(x => singleLoggerDb(x))
}