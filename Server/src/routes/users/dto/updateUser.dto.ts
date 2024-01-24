import { IFileRequest } from "@interface/index.interfaces";

export interface IUpdateUserRequest {
    idUser: string;
    fullName: string;
    rol: string;
    aboutMe: string;
    mySoftSkills: string;
    imageProfile: IFileRequest[];
    curriculumVitae: string;
}