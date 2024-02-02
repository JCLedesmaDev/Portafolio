import { ILoadFileData, ILoadFileProps } from './ILoadFile';

export interface IExposeFile {
    props: ILoadFileProps;
    set: (val: ILoadFileProps, prop?: string) => void;
    setData: (val: ILoadFileData, prop: string) => void;
}