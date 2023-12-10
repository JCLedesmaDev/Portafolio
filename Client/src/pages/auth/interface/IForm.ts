import { IInputProps, IInputData } from '@/libraries/index.libraries';

export interface IFormProps {
    email: IInputProps;
    password: IInputProps;
}

export interface IFormData {
    email: IInputData;
    password: IInputData;
}

