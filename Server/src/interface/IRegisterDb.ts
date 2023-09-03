import { IUser } from "./IUser"
import { IBase } from "./common/IBase";

export interface IRegisterDb extends IBase {
    type: string;
    date: Date;
    request: object;
    response: object;
    user: IUser;
}