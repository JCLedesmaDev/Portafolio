import { IRules } from './IRules';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ISelectProps {
    placeholder: string;
    name: string;
    required: boolean;
    icon?: any;
    autoComplete: string,
    handleChange: (nameField: string, data: any) => void,
    optId?: string;
    optLbl?: string;
    data: ISelectData,
    rules?: IRules[]
}

export interface ISelectData {
    value: any;
    options: any[];
    dirty?: boolean
    error?: boolean,
    messageError?: string;
}
