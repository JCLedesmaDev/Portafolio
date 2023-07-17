import { ObjectId } from "mongoose";
import { IAlbum } from "./IAlbum";

export interface IFigurine {
    id: string;
    title: string;
    image: string;
    idAlbum: ObjectId
}