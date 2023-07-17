import { ObjectId } from "mongoose";
import { IFigurine } from "./IFigurine";

export interface IAlbum {
    id: string;
    title: string;
    image: string;
    idCollection: ObjectId
    figurites: IFigurine[]
}