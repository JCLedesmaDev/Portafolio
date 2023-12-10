import { IBase } from "./common/IBase";
import { ICategoryModel } from "./ICategory.model";
import { ITechnologyModel } from "./ITechnology.model";

export interface ISkillModel extends IBase {
    category: ICategoryModel;
    technologysList: ITechnologyModel[];
}



