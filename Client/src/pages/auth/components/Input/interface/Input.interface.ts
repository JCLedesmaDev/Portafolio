/* eslint-disable @typescript-eslint/no-explicit-any */
interface IAttrInput {
    placeholder: string;
    type: string;
    name: string;
    required: boolean;
    autoComplete?: string;
}

export interface IData {
    value: any;
    dirty?: boolean
    error?: boolean
}

export interface IInputProps {
    attrInput: IAttrInput
    errorMessage: string;
    expReg: RegExp;
    data: IData
}