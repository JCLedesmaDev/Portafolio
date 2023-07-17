import collections from "../models/index.collections"
import { ApplicationError } from "../utils/applicationError";

interface ILogger {
    usuarioId: string;
    tipo: string;
    request: any;
    response: any;
}

/**
 * Crea un registro en la BD con los parametros ingresados.
 * @param infoLooger  usuarioId: string; tipo: string; request: any; response: any; 
 */
const insertLoggerDB = async (infoLooger: ILogger) => {
    try {
        const { usuarioId, tipo, request,
            response } = infoLooger

        await collections.RegistersDb.create({
            type: tipo,
            date: new Date(),
            request: request,
            response: response || {},
            user: usuarioId || '',
        })
    } catch (error) {
        throw new ApplicationError({ message: "Ocurrio un error al querer loggear la info.", source: error });
    }
}

export default {
    insertLoggerDB
}