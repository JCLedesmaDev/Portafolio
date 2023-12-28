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
const insertLoggerDb = (infoLooger: ILogger) => {
    const { usrId, method, url, type, request, response } = infoLooger

    const registerData = {
        type: type,
        method: method,
        url: url,
        date: new Date().toLocaleString(),
        request: request,
        response: response || {},
        user: usrId ? new Types.ObjectId(usrId) : undefined,
    }

    collections.LoggerDb.create(registerData)
}

export default { insertLoggerDb }