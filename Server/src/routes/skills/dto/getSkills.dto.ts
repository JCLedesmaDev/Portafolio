import { ISkill } from "@interface/ISkill";

export interface IGetSkillsRequest {
    usrId: string;
}

export interface IGetSkillsResponse {
    listSkills: ISkill[];
}