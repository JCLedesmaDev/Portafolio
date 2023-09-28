/* eslint-disable @typescript-eslint/no-explicit-any */

interface IAttrInput {
    placeholder: string;
    type: string;
    name: string;
    required: boolean;
    autoComplete?: string;
}

export interface IInputProps {
    data: {
        value: string | any;
    }
    expReg: RegExp;
    errorMessage: string;
    attrInput: IAttrInput
    handleChange: (evt: any) => void;
}