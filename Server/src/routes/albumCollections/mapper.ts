import { IAlbumCollection } from "../../interface/IAlbumCollection";
import { IAlbumCollectionSchema } from "../../models/collections/AlbumCollections";
import { IAlbumSchema } from "../../models/collections/Albumes";
import * as mapperAlbumes from "../albumes/mapper";


const singleCollections = (resource: IAlbumCollectionSchema): IAlbumCollection => {
    const mapper: IAlbumCollection = {
        id: resource._id,
        title: resource.title,
        albumList: mapperAlbumes.multipleAlbums(resource.albumes as IAlbumSchema[])
    }
    return mapper
};

const multipleCollections = (albumCollecions: IAlbumCollectionSchema[]): IAlbumCollection[] => (
    albumCollecions.map((albumCollection: IAlbumCollectionSchema) => singleCollections(albumCollection))
)

export default {
    multipleCollections
};