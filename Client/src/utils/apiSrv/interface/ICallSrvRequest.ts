type Method = 'POST' | 'GET' | 'PUT' | 'DELETE'

export interface ICallSrvRequest<TypeData> {
    method: Method;
    path: string;
    data?: TypeData;
}