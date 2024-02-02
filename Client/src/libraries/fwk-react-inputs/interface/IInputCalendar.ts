import { IRules } from './IRules';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IInputCalendarProps {
    name: string;
    required: boolean;
    autoComplete: string,
    refresh: () => void,
    data: IInputCalendarData,
    rules?: IRules[]
}

export interface IInputCalendarData {
    value: any;
    dirty?: boolean
    error?: boolean,
    messageError?: string;
}
