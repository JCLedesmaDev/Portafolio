import collections from "@models/index.collections"
import { ApplicationError } from "@utils/applicationError";
import { Types } from "mongoose";

interface ILogger {
    type: string;
    method: string;
    url: string;
    usrId: string;

    request: any;
    response: any;
}

/**
 * Crea un registro en la BD con los parametros ingresados.
 * @param infoLooger  usuarioId: string; tipo: string; request: any; response: any; 
 */
const insertLoggerDb = async (infoLooger: ILogger) => {
    try {
        const { usrId, method, url, type, request, response } = infoLooger

        const registerData = {
            type: type,
            method: method,
            url: url,
            date: new Date().toLocaleString(),
            request: request,
            response: response || {},
            user: usrId ? new Types.ObjectId(usrId) : 'undefined',
        }

        await collections.LoggerDb.create(registerData)
    } catch (error) {
        throw new ApplicationError({
            message: "Ocurrio un error al querer loggear la info.",
            source: error
        });
    }
}

export default {
    insertLoggerDb
}