import collections from "@models/index.collections"
import { ApplicationError } from "@utils/applicationError";
import { Types } from "mongoose";

interface ILogger {
    usrId: string;
    type: string;
    request: any;
    response: any;
}

/**
 * Crea un registro en la BD con los parametros ingresados.
 * @param infoLooger  usuarioId: string; tipo: string; request: any; response: any; 
 */
const insertLoggerDb = async (infoLooger: ILogger) => {
    try {
        const { usrId, type, request, response } = infoLooger

        const registerData = {
            type: type,
            date: new Date(),
            request: request,
            response: response || {},
            user: new Types.ObjectId(usrId),
        }

        await collections.RegisterDb.create(registerData)
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