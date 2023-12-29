import { IBase } from "./common/IBase";

export interface IRegisterDb extends IBase {
    type: string;
    date: number;
    url: string;
    method: string;
    request: object;
    response: object;
    user: string;
}