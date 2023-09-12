import { IFigurineModels } from "./IFigurine.models";


export interface IPurchasedFigurineModels {
    id: string;
    figurineRef: IFigurineModels;
    idPurchasedAlbum: string;
}
