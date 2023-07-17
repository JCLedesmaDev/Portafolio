
interface IResquestType<TypeData> {
    message?: string;
    data?: TypeData
}
interface IRequestMethod<TypeData> extends IResquestType<TypeData> {
    typeResponse: string
}

export interface IResponse<typeData> {
    info: {
        type: string;
        msg?: string;
        data?: typeData
    }
}


/**
 * Funcion que crea el DTO para el front
 * @param infoResponse Objeto que contiene props: "message"; "data"; "typeResponse"
 * @params typeData: Se pasa por parametro el tipo de dato que sera "data"
 * @returns Objeto generico de respuesta.
 */
const response = <typeData>(infoResponse: IRequestMethod<typeData>): IResponse<typeData> => {
    const { data, message, typeResponse } = infoResponse
    return {
        info: {
            type: typeResponse,
            msg: message,
            ...(data && {
                data: data as typeData
            })
        },
    }
}

/**
 * Mensaje de respuesta de peticion 200.
 * @param info Objeto que contiene props: "message"; "data";
 * @params typeData: Se pasa por parametro el tipo de dato que sera "data"
 * @returns Objeto generico de respuesta.
 */
const success = <typeData>(info: IResquestType<typeData>): IResponse<typeData> => {
    const { data, message } = info
    return response<typeData>({ typeResponse: 'success', message, data })
}

/**
 * Mensaje de respuesta de peticion 400 - 500.
 * @param info Objeto que contiene props: "message"; "data";
 * @params typeData: Se pasa por parametro el tipo de dato que sera "data"
 * @returns Objeto generico de respuesta.
 */
const error = <typeData>(info: IResquestType<typeData>): IResponse<typeData> => {
    const { data, message } = info
    return response<typeData>({ typeResponse: 'error', message, data })
}

export default {
    success,
    error
}
