import { ICategory } from "@interface/ICategory";

export interface IAddCaterogyRequest {
    usrId: string;
    name: string;
}

export interface IAddCategoryResponse {
    category: ICategory;
}