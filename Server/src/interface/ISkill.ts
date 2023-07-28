import { IBase } from "./common/IBase";
import { ICategory } from "./ICategory";
import { ITechnology } from "./ITechnology";

export interface ISkill extends IBase {
    category: ICategory;
    techologysList: ITechnology[];
}



