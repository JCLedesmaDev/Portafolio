import { IFileRequest } from "@interface/IFileRequest";

export interface IUpdateUserRequest {
    idUser: string;
    fullName: string;
    seniority: string;
    aboutMe: string;
    mySkills: string;
    imageProfile: IFileRequest[];
    curriculumVitae: string; 
}

export interface IUpdateUserResponse {
    message: string;
}