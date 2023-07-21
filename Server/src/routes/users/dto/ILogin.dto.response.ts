import { IUser } from "@interface/IUser";

export interface ILoginDtoResponse {
    token: string;
    user: IUser;
}