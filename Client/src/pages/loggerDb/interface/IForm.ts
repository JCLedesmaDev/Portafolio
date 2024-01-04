import { IInputData, IInputProps, ISelectData, ISelectProps } from '@/libraries/index.libraries';

export interface IFormProps {
    user: ISelectProps;
    countPerPage: IInputProps;
}

export interface IFormData {
    user: ISelectData;
    countPerPage: IInputData;
}