import { IRules } from './IRules';

/* eslint-disable @typescript-eslint/no-explicit-any */
type TypeInput = 'text' | 'number' | 'email'
export interface IInputProps {
    placeholder: string;
    type?: TypeInput;
    name: string;
    required: boolean;
    icon?: any;
    data: IInputData,
    autoComplete: string,
    refresh: () => void,
    rules?: IRules[]
}

export interface IInputData {
    value: any;
    dirty?: boolean
    error?: boolean,
    messageError?: string;
}

