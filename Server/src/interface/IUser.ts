import { IRol } from "./IRol";

export interface IUser {
    id: string;
    fullName: string;
    email: string;
    roles: IRol[]
}