export interface ICallSrvResponse<TypeData> {
    info: {
        type: string;
        msg?: string;
        data?: TypeData;
    }
}