import { IUserModel } from "./IUser.model"
import { IBase } from "./common/IBase";

export interface ILoggerDB extends IBase {
    Tipo: string;
    Usuario: IUserModel;
    Fecha: Date;
    Request: object;
    Response: object;
}