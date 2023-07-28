import { IFileRequest } from "@interface/IFileRequest";

export interface IUpdateTechnologyRequest {
    name: string;
    image: IFileRequest[];
    idCategory: string;
    idTechnology: string;
}

