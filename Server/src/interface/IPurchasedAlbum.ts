import { ObjectId } from "mongoose";
import { IAlbum } from "./IAlbum";
import { IPurchasedFigurine } from "./IPurchasedFigurine";
import { IUser } from "./IUser";

export interface IPurchasedAlbum {
    albumRef: IAlbum; 
    id: string;
    idUser: ObjectId;
    purchasedFigurites: IPurchasedFigurine[];
}
