/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILoggerDB } from '@/models/ILoggerDB.model';

const singleRegisterLogger = (resource: any): ILoggerDB => {
    const mapper: ILoggerDB = {
        Fecha: resource.date,
        Id: resource.id,
        Usuario: resource.user,
        Tipo: resource.type,
        Request: resource.request,
        Response: resource.response
    }
    return mapper
}

export const registerLoggers = (resource: any[]): ILoggerDB[] => {
    return resource.map(x => singleRegisterLogger(x))
}