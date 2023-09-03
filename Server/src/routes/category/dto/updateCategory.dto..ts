
import { ICategory } from "@interface/ICategory";

export interface IUpdateCategoryRequest {
    usrId: string;
    /// 
    idCategory: string;
    name: string;
}

export interface IUpdateCategoryResponse {
    category: ICategory;
}