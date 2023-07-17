
import { ObjectId } from "mongoose";
import { IAlbum } from "../../interface/IAlbum";
import { IFigurine } from "../../interface/IFigurine";
import { IPurchasedAlbum } from "../../interface/IPurchasedAlbum";
import { IPurchasedFigurine } from "../../interface/IPurchasedFigurine";
import { IAlbumSchema } from "../../models/collections/Albumes";
import { IFigurineSchema } from "../../models/collections/Figurites";
import { IPurchasedAlbumSchema } from "../../models/collections/PurchasedAlbumes";
import { IPurchasedFiguresSchema } from "../../models/collections/PurchasedFigures";

export const multipleAlbums = (Albums: IAlbumSchema[]): IAlbum[] => (
    Albums.map(album => singleAlbum(album))
)
export const singleAlbum = (resource: IAlbumSchema): IAlbum => {
    const mapper: IAlbum = {
        id: resource._id,
        title: resource.title,
        image: resource.image,
        idCollection: resource.albumCollections as ObjectId,
        figurites: multipleFigures(resource.figurites as IFigurineSchema[])
    }
    return mapper
};


const multipleFigures = (figurites: IFigurineSchema[]): IFigurine[] => (
    figurites.map((figurine) => singleFigurine(figurine))
)
const singleFigurine = (figurine: IFigurineSchema): IFigurine => {
    const mapper: IFigurine = {
        id: figurine._id,
        idAlbum: figurine.album as ObjectId,
        image: figurine.image,
        title: figurine.title
    }
    return mapper
}


export const multiplePurchasedAlbumes = (purchasedAlbumes: IPurchasedAlbumSchema[]): IPurchasedAlbum[] => (
    purchasedAlbumes.map(purchasedAlbum => singlePurchasedAlbum(purchasedAlbum))
)
const singlePurchasedAlbum = (purchasedAlbum: IPurchasedAlbumSchema): IPurchasedAlbum => {
    const mapper: IPurchasedAlbum = {
        id: purchasedAlbum._id,
        albumRef: singleAlbum(purchasedAlbum.albumRef as IAlbumSchema),
        purchasedFigurites: multiplePurchasedFigurites(purchasedAlbum.purchasedFigures as IPurchasedFiguresSchema[]),
        idUser: purchasedAlbum.user as ObjectId
    }
    return mapper
}


const multiplePurchasedFigurites = (purchasedFigurites: IPurchasedFiguresSchema[]): IPurchasedFigurine[] => (
    purchasedFigurites.map(purchasedAlbum => singlePurchasedFigurine(purchasedAlbum))
)
const singlePurchasedFigurine = (purchasedFigurine: IPurchasedFiguresSchema): IPurchasedFigurine => {
    const mapper: IPurchasedFigurine = {
        id: purchasedFigurine._id,
        figurineRef: singleFigurine(purchasedFigurine.figurineRef as IFigurineSchema),
        idPurchasedAlbum: purchasedFigurine.purchasedAlbum as ObjectId
    }
    return mapper
}