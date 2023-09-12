import { IRolModels } from "./IRol.models";

export interface IUserModels {
    id: string;
    fullName: string;
    email: string;
    roles: IRolModels[]
    tokenAuth: string;
}