/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IInputData {
    value: any;
    dirty?: boolean
    error?: boolean,
    messageError?: string;
}

export interface IInputProps {
    placeholder: string;
    type: string;
    name: string;
    required: boolean;
    style?: any;
    icon?: any;
    data: IInputData,
    autoComplete: string,
    handleChange: (nameField: string, data: any) => void,
    rules: ((val: any) => any)[]
}