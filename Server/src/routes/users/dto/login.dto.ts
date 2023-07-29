import { IUser } from "@interface/IUser";

export interface ILoginDtoRequest {
    email: string;
    password: string;
} 

export interface ILoginDtoResponse {
    token: string;
    user: IUser;
}