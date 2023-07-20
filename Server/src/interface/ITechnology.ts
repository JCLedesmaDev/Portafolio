import { IBase } from "./common/IBase";
import { ICategory } from "./ICategory";

export interface ITechnology extends IBase{
    name: string;
    category: ICategory;
}