import { IFileRequest } from "@interface/IFileRequest";

export interface IAddTechnologyRequest {
    usrId: string;
    name: string;
    image: IFileRequest[];
    idCategory: string;
}

