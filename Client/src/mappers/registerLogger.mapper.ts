/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRegisterDbModel } from '@/models/IRegisterDb.model';

export const registerLogger = (resource: any): IRegisterDbModel => {
    const mapper: IRegisterDbModel = {
        Fecha: resource.date,
        Id: resource.id,
        Usuario: resource.user,
        Tipo: resource.type,
        Request: resource.request,
        Response: resource.response
    }
    return mapper
}