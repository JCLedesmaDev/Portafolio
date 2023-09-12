
import { ICategory } from "@interface/index.interfaces";

export interface IUpdateCategoryRequest {
    usrId: string;
    /// 
    idCategory: string;
    name: string;
}

export interface IUpdateCategoryResponse {
    category: ICategory;
}