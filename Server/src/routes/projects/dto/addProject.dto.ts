import { IColaborator } from "@interface/IColaborator";
import { IFileRequest } from "@interface/IFileRequest";
import { IProject } from "@interface/IProject";

export interface IAddProjectRequest {
    usrId: string;
    /// 
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

export interface IAddProjectResponse {
    project: IProject;
}