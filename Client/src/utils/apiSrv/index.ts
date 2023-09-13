import axios, { AxiosInstance, RawAxiosRequestHeaders, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import {
    ICallSrvRequest,
    ICallSrvError,
    ICallSrvResponse,
    IConfigInit,
    IHeaders, ICallBackendOptions
} from './interface/index.interfaces';
import { magnamentStorage } from '@/utils/index.utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let showPopupSpinnerFn = (spinner: boolean, status: boolean, message: string) => {
    console.log('No se ha cargado nada.')
}
let srv: AxiosInstance;

export const apiSrv = {

    /**
     * Inicializacion de config del ApiSrv
     * @param {*} config 
     */
    init: (config: IConfigInit) => {
        apiSrv.setHeaders(config.info)
        const headersDef: RawAxiosRequestHeaders = {
            // 'Access-Control-Allow-Credentials':'true',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'es-ES,es;q=0.9',
            'Content-Type': 'application/json;charset=UTF-8',
        }

        srv = axios.create({
            baseURL: config.url,
            headers: headersDef,
        })
        srv.interceptors.request.use(
            (request: InternalAxiosRequestConfig) => {
                /// Setear los headers que actualice por aca....
                const headersList = magnamentStorage.get<IHeaders>('headers')
                type headersKeyType = keyof typeof headersList; // No lo entendi, pero anda XD.

                for (const headerKey in headersList) {
                    if (headerKey) {
                        const value = headersList[headerKey as headersKeyType]
                        request.headers.set(headerKey, value)
                    }
                }
                return request
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        )
        srv.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: AxiosError) => {
                // console.log('Error ApiSrv!!!! :' + error)
                if (error.response?.status === 401) { // Hice que el 401 sea especifico de token
                    magnamentStorage.remove("user");
                    magnamentStorage.remove('headers')

                    window.location.href = `${window.location.origin}/auth`;
                }
                return Promise.reject(error.response);
            }
        )
    },

    setHeaders: (headers: IHeaders) => {
        let headersList = magnamentStorage.get<IHeaders>('headers')
        type headersKeyType = keyof typeof headersList; // No lo entendi, pero anda XD.

        for (const headerKey in headers) {
            const headerValue = headers[headerKey as headersKeyType]
            if (headerValue) {
                headersList = { ...headersList, [headerKey]: headerValue }
            }
        }
        magnamentStorage.set<IHeaders>('headers', headersList)
    },

    /**
     * 
     * @param preCallback Function exceute end-point to back 
     * @param options Declare if this function has loader or status
     * @returns Return data with these attributes: info: {type: string; msg: string; data: any}
     */
    callBackend: async <TypeDataResponse>(
        preCallback: () => Promise<ICallSrvResponse<TypeDataResponse>>,
        options: ICallBackendOptions
    ): Promise<ICallSrvResponse<TypeDataResponse>> => {

        type responseCb = ICallSrvResponse<TypeDataResponse>

        let res = {} as responseCb

        try {
            if (options.loader) showPopupSpinnerFn(true, false, '')

            res = await preCallback() as responseCb

            if (res.info.type === 'error') throw new Error(res.info.msg)

            if (options.status && res.info.msg) {
                showPopupSpinnerFn(false, options.status, res.info.msg as string)
            }
        } catch (error: unknown) {
            const err = error as Error
            showPopupSpinnerFn(false, true, err.message)
        } finally {
            const time = options.status ? 3000 : 0
            setTimeout(() => {
                showPopupSpinnerFn(false, false, '')
            }, time);
        }
        return res
    },

    callSrv: async <TypeDataRequest, TypeDataResponse>(
        optCallSrv: ICallSrvRequest<TypeDataRequest>
    ): Promise<ICallSrvResponse<TypeDataResponse>> => {

        type responseCb = ICallSrvResponse<TypeDataResponse>

        const { method, path, data } = optCallSrv
        let res = {} as responseCb

        try {
            if (method === "GET") {
                const params = { ...(data && data) }
                res = await (await srv.get(path, {
                    params: params || {}
                })).data
            }
            if (method === "POST") res = await (await srv.post(path, data)).data
            if (method === "PUT") res = await (await srv.put(path, data)).data
            if (method === "DELETE") res = await (await srv.delete(path)).data
        } catch (error: unknown) {

            const err = error as ICallSrvError<string>
            err.data.info
                ? res = err.data as responseCb
                : res = { info: { type: 'error', msg: err.message } }
        }
        return res
    },


    setShowPopupSpinnerAlertFn: (callbackFn: (
        spinner?: boolean, status?: boolean, message?: string) => void
    ) => {
        showPopupSpinnerFn = callbackFn
    }
}

