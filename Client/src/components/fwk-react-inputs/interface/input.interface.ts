/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IInputData {
    value: any;
    dirty?: boolean
    error?: boolean,
    messageError?: string;
}

export interface IInputRules {
    fnCondition: (val: any) => any;
    messageError: string
}

export interface IInputProps {
    placeholder: string;
    type: string;
    name: string;
    required: boolean;
    icon?: any;
    data: IInputData,
    autoComplete: string,
    handleChange: (nameField: string, data: any) => void,
    rules: IInputRules[]
}