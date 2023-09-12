import { IAlbumModels } from "./IAlbum.models";

export interface IAlbumCollectionModels {
    id: string;
    title: string;
    albumList : IAlbumModels[]
}