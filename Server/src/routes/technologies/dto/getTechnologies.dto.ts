import { ITechnology } from "@interface/ITechnology";
import { IFilterPagination, IPagination } from "@interface/pagination";

export interface IGetTechnologiesRequest extends IFilterPagination {
    usrId: string;
}

export interface IGetTechnologiesResponse extends IPagination { 
   docs: ITechnology[];
}