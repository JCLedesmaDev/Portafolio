/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import {
    ICallSrvRequest,
    ICallSrvError,
    ICallSrvResponse,
    IConfigInit,
    IHeaders, ICallBackEndRequest
} from './interface/index.interfaces';
import { magnamentStorage } from '@/utils/index.utils';
import { ui } from '../index.libraries';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let srv: AxiosInstance;
let headersCfg: IHeaders

export const apiSrv = {

    /**
     * Inicializacion de config del ApiSrv
     * @param {*} config 
     */
    init: (config: IConfigInit) => {
        apiSrv.setHeaders(config.info)

        srv = axios.create({
            baseURL: config.url,
            withCredentials: true,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'es-ES,es;q=0.9',
                'Content-Type': 'application/json;charset=UTF-8',
            }
        })
        srv.interceptors.request.use(
            (request: InternalAxiosRequestConfig) => {
                /// Setear los headers que actualice por aca....
                type headersKeyType = keyof typeof headersCfg; // No lo entendi, pero anda XD.

                for (const headerKey in headersCfg) {
                    if (headerKey) {
                        const value = headersCfg[headerKey as headersKeyType]
                        request.headers.set(headerKey, value)
                    }
                }
                return request
            },
            (error: AxiosError) => {
                return Promise.reject(error.request);
            }
        )
        srv.interceptors.response.use(
            (response: AxiosResponse) => { return response; },
            (error: AxiosError) => {
                // Hice que el 401 sea especifico de token
                if (error?.response?.status === 401) {
                    setTimeout(() => {
                        magnamentStorage.remove("user");
                        window.location.href = `${window.location.origin}/auth`;
                    }, 4000)
                } else if (error?.request) {
                    if (error.message === 'Network Error') {
                        error.message = 'La solicitud HTTP no pudo completarse debido a un problema de red.'
                    }
                }
                return Promise.reject(error.response || error);
            }
        )
    },

    setHeaders: (headers: IHeaders) => {
        headersCfg = headers
    },

    /**
     * 
     * @param preCallback Function exceute end-point to back 
     * @param options Declare if this function has loader or status
     * @returns Return data with these attributes: info: {type: string; msg: string; data: any}
     */
    callBackEnd: async (payload: ICallBackEndRequest): Promise<any> => {

        const { preCallback, options } = payload
        let res = {} as ICallSrvResponse
        let err: Error
        try {
            if (options.loader) ui.actions.showLoader(options?.message)

            res = await preCallback() as ICallSrvResponse

            if (res.info.type === 'error') throw new Error(res.info.msg)

            if (options.status && res.info?.msg) {
                ui.actions.showNotify(res.info.msg, res.info.type)
            }
        } catch (error: unknown) {
            err = error as Error
            ui.actions.showNotify(err.message, 'error')
        } finally {
            if (options.loader) ui.actions.closeLoader()
        }
        return res.info.data ?? ((res.info.type !== 'error') && (res.info.type !== 'warning'))
    },

    callSrv: async (payload: ICallSrvRequest): Promise<ICallSrvResponse> => {

        const { method, path, data } = payload
        let res = {} as ICallSrvResponse

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
            const err = error as ICallSrvError
            err?.data?.info
                ? res = err.data
                : res = {
                    info: { type: 'error', msg: err?.message }
                }
        }
        return res
    }
}

