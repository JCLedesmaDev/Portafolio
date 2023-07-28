import { IBase } from "./common/IBase";
import { IColaborator } from "./IColaborator";

export interface IProject extends IBase {
    name: string;
    description: string;
    details: string;
    periodTimeFrom: number;
    periodTimeTo: number;
    typeProject: string;
    projectLink: string;
    repositoryLink: string;
    images: string[]
    colaboratorsList: IColaborator[];
}