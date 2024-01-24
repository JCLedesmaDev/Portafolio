import { IBase } from "./common/IBase";
import { IProject } from "./IProject";
import { ISkill } from "./ISkill";

export interface IUser extends IBase {
    fullName: string;
    imageProfile: string;
    rol: string;
    aboutMe: string;
    email: string;
    projectsList: IProject[];
    curriculumVitae: string;
    mySoftSkills: string;
    skillsList: ISkill[];
}