import { IRules } from './IRules';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IInputListProps {
    placeholder: string;
    name: string;
    required: boolean;
    icon?: any;
    autoComplete: string,
    handleChange: (nameField: string, data: any) => void,
    optId?: string;
    optLbl?: string;
    data: IInputListData,
    rules?: IRules[]
}

export interface IInputListData {
    value: any;
    options: any[];
    dirty?: boolean
    error?: boolean,
    messageError?: string;
}
