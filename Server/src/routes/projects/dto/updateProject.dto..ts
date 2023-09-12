import { IColaborator, IFileRequest, IProject } from "@interface/index.interfaces";
export interface IUpdateProjectRequest {
    usrId: string;
    /// 
    idProject: string;
    name: string;
    description: string;
    details: string;
    periodTimeFrom: number;
    periodTimeTo: number;
    typeProject: string;
    projectLink: string;
    repositoryLink: string;
    colaboratorsList: IColaborator[];
    images: IFileRequest[];
}

export interface IUpdateProjectResponse {
    project: IProject;
}