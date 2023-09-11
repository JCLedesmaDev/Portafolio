import { ICallSrvResponse } from "./ICallSrvResponse";

export interface ICallSrvError<TypeData> {
    data: ICallSrvResponse<TypeData>;
    message: string
}