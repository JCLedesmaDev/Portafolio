import { IUserModel } from "./IUser.model"
import { IBase } from "./common/IBase";

export interface IRegisterDbModel extends IBase {
    type: string;
    date: Date;
    request: object;
    response: object;
    user: IUserModel;
}