import { IAlbumModels } from "./IAlbum.models";
import {  IPurchasedFigurineModels } from "./IPurchasedFigurine.models";

export interface IPurchasedAlbumModels {
    id: string;
    albumRef: IAlbumModels;
    idUser: string;
    purchasedFigurites: IPurchasedFigurineModels[];
}
