import { IAlbum } from "./IAlbum";

export interface IAlbumCollection {
    id: string;
    title: string;
    albumList: IAlbum[]
}