import {IFigurineModels } from "./IFigurine.models";

export interface IAlbumModels {
    id: string;
    title: string;
    image: string;
    idCollection: string;
    figurites: IFigurineModels[]
}