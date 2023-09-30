/* eslint-disable @typescript-eslint/no-explicit-any */

interface IAttrInput {
    placeholder: string;
    type: string;
    name: string;
    required: boolean;
    autoComplete?: string;
}
export interface IInputData {
    value: any;
    dirty?: boolean
    error?: boolean
}

export interface IInputProps {
    data: IInputData;
    expReg: RegExp;
    errorMessage: string;
    attrInput: IAttrInput
    handleChange: (nameField: string, data: any) => void;
}