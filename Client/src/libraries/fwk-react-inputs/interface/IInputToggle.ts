import { IRules } from './IRules';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IInputToggleProps {
    name: string;
    data: IInputToggleData,
    refresh: () => void,
    rules: IRules[]
}

export interface IInputToggleData {
    value: any;
    dirty?: boolean
    error?: boolean,
    messageError?: string;
}
