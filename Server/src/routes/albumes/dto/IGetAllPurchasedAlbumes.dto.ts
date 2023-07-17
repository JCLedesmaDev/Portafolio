import { IPagination } from "../../../interface/IPagination";

export interface IGetAllPurchasedAlbumesDto extends IPagination {
    userId: string
}