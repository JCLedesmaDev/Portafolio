import { IFileRequest, ITechnology } from "@interface/index.interfaces";
export interface IAddTechnologyRequest {
    usrId: string;
    name: string;
    image: IFileRequest[];
    idCategory: string;
}

export interface IAddTechnologyResponse {
    technology: ITechnology
}