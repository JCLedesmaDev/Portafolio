import { IBase } from "./common/IBase";

export interface IRegisterDb extends IBase {
    type: string;
    date: string;
    url: string;
    method: string;
    request: object;
    response: object;
    user: string;
}