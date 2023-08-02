import { IBase } from "./common/IBase";

export interface ISkills extends IBase {
    category: ICategory;
    techologyList: ITechnology[];
}

export interface ICategory extends IBase {
    name: string;
}

export interface ITechnology extends IBase {
    name: string;
    image: string,
}