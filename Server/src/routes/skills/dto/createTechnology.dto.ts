import { IFileRequest } from "@interface/IFileRequest";

export interface ICreateTechnologyRequest {
    usrId: string;
    name: string;
    image: IFileRequest[];
    idCategory: string;
}

