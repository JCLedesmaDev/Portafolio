import { IUserModel } from "./IUser.model"
export interface ILoggerDB {
    Tipo: string;
    Usuario: IUserModel;
    Fecha: Date;
    Request: object;
    Response: object;
}