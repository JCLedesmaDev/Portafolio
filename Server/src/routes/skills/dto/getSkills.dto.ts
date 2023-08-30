import { ISkill } from "@interface/ISkill";
import { IFilterPagination, IPagination } from "@interface/pagination";

export interface IGetSkillsRequest extends IFilterPagination {
    usrId: string;
}

export interface IGetSkillsResponse extends IPagination { 
   docs: ISkill;
}