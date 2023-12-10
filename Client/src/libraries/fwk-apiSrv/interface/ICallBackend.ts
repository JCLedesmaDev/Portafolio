import { ICallSrvResponse } from './index.interfaces';

interface ICallBackEndOptions {
    loader?: boolean;
    status?: boolean;
}

export interface ICallBackEndRequest {
    preCallback: () => Promise<ICallSrvResponse>;
    options: ICallBackEndOptions
}