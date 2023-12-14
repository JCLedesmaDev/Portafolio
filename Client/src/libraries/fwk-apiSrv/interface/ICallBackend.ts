import { ICallSrvResponse } from './index.interfaces';

interface ICallBackEndOptions {
    loader?: boolean;
    status?: boolean;
    message?: string;
}

export interface ICallBackEndRequest {
    preCallback: () => Promise<ICallSrvResponse>;
    options: ICallBackEndOptions
}