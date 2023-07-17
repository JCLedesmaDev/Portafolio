import { ObjectId } from "mongoose";
import { IFigurine } from "./IFigurine";

export interface IPurchasedFigurine {
    id: string;

    figurineRef: IFigurine;
    idPurchasedAlbum: ObjectId;
}
