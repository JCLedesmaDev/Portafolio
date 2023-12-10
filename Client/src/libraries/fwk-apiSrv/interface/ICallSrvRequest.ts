/* eslint-disable @typescript-eslint/no-explicit-any */
type Method = 'POST' | 'GET' | 'PUT' | 'DELETE'

export interface ICallSrvRequest {
    method: Method;
    path: string;
    data?: any;
}