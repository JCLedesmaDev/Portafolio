import { IBase } from "./common/IBase";

export interface IColaborator extends IBase {
    name: string;
    repositoryLink: string;
}