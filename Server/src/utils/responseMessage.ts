
interface IRequestMessage<TypeData> {
    message?: string;
    data?: TypeData
}

export interface IResponseMessage<typeData> {
    info: {
        type: string;
        data: typeData
        msg?: string;
    }
}

/**
 * Mensaje de respuesta de peticion 200.
 * @param info Objeto que contiene props: "message"; "data";
 * @params typeData: Se pasa por parametro el tipo de dato que sera "data"
 * @returns Objeto generico de respuesta.
 */
const success = <typeData> (info: IRequestMessage<typeData>): IResponseMessage<typeData> => {
    const { data, message } = info

    return response<typeData>({ typeResponse: 'success', message, data })
}

/**
 * Mensaje de respuesta de peticion 400 - 500.
 * @param info Objeto que contiene props: "message"; "data";
 * @params typeData: Se pasa por parametro el tipo de dato que sera "data"
 * @returns Objeto generico de respuesta.
 */
const error = <typeData> (info: IRequestMessage<typeData>): IResponseMessage<typeData> => {
    const { data, message } = info

    return response<typeData>({ typeResponse: 'error', message, data })
}


/////////////////////////////
interface IRequestMethod<TypeData> extends IRequestMessage<TypeData> {
    typeResponse: string
}

const response = <typeData> (infoResponse: IRequestMethod<typeData>): IResponseMessage<typeData> => {
    const { data, message, typeResponse } = infoResponse

    return {
        info: {
            type: typeResponse,
            data: data as typeData,
            ...(message && { msg: message }),
        },
    }
}

export default {
    success,
    error
}
