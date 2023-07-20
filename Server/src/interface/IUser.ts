import { IBase } from "./common/IBase";
import { IProject } from "./IProject";
import { ITechnology } from "./ITechnology";

export interface IUser extends IBase {
    fullName: string;
    seniority: string;
    aboutMe: string;
    mySkills: string;
    email: string;
    projectList: IProject[];
    techologyList: ITechnology[];
    curriculumVitae: string;
}