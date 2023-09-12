import { ICategory } from "@interface/index.interfaces";

export interface IAddCaterogyRequest {
    usrId: string;
    name: string;
}

export interface IAddCategoryResponse {
    category: ICategory;
}