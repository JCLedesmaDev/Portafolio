import { IRules } from './IRules';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ILoadFileProps {
    name: string;
    required: boolean;
    type: 'image' | 'file'
    data: ILoadFileData
    rules?: IRules[]
    imageDefault?: any
    refresh: () => void,
}
export interface ILoadFileData {
    value: any;
    dirty?: boolean
    error?: boolean,
}