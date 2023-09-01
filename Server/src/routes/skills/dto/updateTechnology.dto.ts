import { IFileRequest } from "@interface/IFileRequest";
import { ITechnology } from "@interface/ITechnology";

export interface IUpdateTechnologyRequest {
    name: string;
    image: IFileRequest[];
    idCategory: string;
    idTechnology: string;
}


export interface IUpdateTechnologyResponse {
    technology: ITechnology
}