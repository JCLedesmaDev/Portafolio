import { IRegisterDb } from "@interface/IRegisterDb";
import { IPagination } from "@interface/pagination";

export interface IGetAllLogerDbResponse extends IPagination  {
    docs: IRegisterDb[];
}