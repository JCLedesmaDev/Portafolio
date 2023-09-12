import { IFileRequest, ITechnology } from "@interface/index.interfaces";
export interface IUpdateTechnologyRequest {
    name: string;
    image: IFileRequest[];
    idCategory: string;
    idTechnology: string;
}


export interface IUpdateTechnologyResponse {
    technology: ITechnology
}