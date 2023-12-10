import { IBase } from "./common/IBase";
import { IColaboratorModel } from "./IColaborator.model";

export interface IProjectModel extends IBase {
    name: string;
    description: string;
    details: string;
    periodTimeFrom: number;
    periodTimeTo: number;
    typeProject: string;
    projectLink: string;
    repositoryLink: string;
    images: string[]
    colaboratorsList: IColaboratorModel[];
}