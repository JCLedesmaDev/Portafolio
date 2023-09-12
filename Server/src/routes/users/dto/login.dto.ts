import { IUser } from "@interface/index.interfaces";

export interface ILoginDtoRequest {
    email: string;
    password: string;
} 

export interface ILoginDtoResponse {
    token: string;
    user: IUser;
}