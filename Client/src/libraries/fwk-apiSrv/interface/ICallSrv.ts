/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ICallSrvResponse {
    info: {
        type: string;
        msg?: string;
        data?: any;
    }
}

type Method = 'POST' | 'GET' | 'PUT' | 'DELETE'

export interface ICallSrvRequest {
    method: Method;
    path: string;
    data?: any;
}

export interface ICallSrvError {
    data: ICallSrvResponse;
    message: string
}