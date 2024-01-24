import { IInputProps, IInputData } from '@/libraries/index.libraries';

export interface IFormProps {
    fullName: IInputProps;
    rol: IInputProps;
    aboutMe: IInputProps;
    //imageProfile: IInputProps;
    //cvProfile: IInputProps;
}

export interface IFormData {
    fullName: IInputData;
    rol: IInputData;
    aboutMe: IInputData;
    imageProfile: IInputData;
    curriculumVitae: IInputData;
}

