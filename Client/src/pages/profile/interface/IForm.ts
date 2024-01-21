import { IInputProps, IInputData } from '@/libraries/index.libraries';

export interface IFormProps {
    nameComplete: IInputProps;
    rol: IInputProps;
    aboutMe: IInputProps;
    //imageProfile: IInputProps;
    //cvProfile: IInputProps;
}

export interface IFormData {
    nameComplete: IInputData;
    rol: IInputData;
    aboutMe: IInputData;
    imageProfile: IInputData;
    curriculumVitae: IInputData;
}

