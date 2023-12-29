import { IRegisterDb, IPagination } from "@interface/index.interfaces";

export interface IGetAllLoggerDbRequest {
    page: number;
    limitPage: number;
    userId?: string;
    typeEvent?: string;
    dateFrom: Date;
    dateUntil: Date;
}
export interface IGetAllLoggerDbResponse extends IPagination {
    docs: IRegisterDb[];
}