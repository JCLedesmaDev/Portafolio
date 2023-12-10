import { IProjectModel } from "./IProject.model";
import { ISkillModel } from "./ISkill.model";

export interface IUserModel {
    fullName?: string;
    imageProfile?: string;
    seniority?: string;
    aboutMe?: string;
    email?: string;
    projectsList?: IProjectModel[];
    curriculumVitae?: string;
    mySoftSkills?: string;
    skillsList?: ISkillModel[];
}