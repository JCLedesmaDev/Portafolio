import { IRegisterDb, IPagination } from "@interface/index.interfaces";

export interface IGetAllLogerDbResponse extends IPagination  {
    docs: IRegisterDb[];
}