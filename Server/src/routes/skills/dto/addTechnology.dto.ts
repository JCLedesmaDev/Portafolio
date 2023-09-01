import { IFileRequest } from "@interface/IFileRequest";
import { ITechnology } from "@interface/ITechnology";

export interface IAddTechnologyRequest {
    usrId: string;
    name: string;
    image: IFileRequest[];
    idCategory: string;
}

export interface IAddTechnologyResponse {
    technology: ITechnology
}