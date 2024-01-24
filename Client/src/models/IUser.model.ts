import { IProjectModel } from "./IProject.model";
import { ISkillModel } from "./ISkill.model";
import { IBase } from './common/IBase';

export interface IUserModel extends IBase {
    fullName?: string;
    imageProfile?: string;
    rol?: string;
    aboutMe?: string;
    email?: string;
    projectsList?: IProjectModel[];
    curriculumVitae?: string;
    mySoftSkills?: string;
    skillsList?: ISkillModel[];
}