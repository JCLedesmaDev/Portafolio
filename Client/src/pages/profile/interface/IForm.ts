import { IInputProps, IInputData, ILoadFileProps } from '@/libraries/index.libraries';
export interface IFormProps {
    fullName: IInputProps;
    rol: IInputProps;
    aboutMe: IInputProps;
    imageProfile: ILoadFileProps;
    curriculumVitae: ILoadFileProps;
}

export interface IFormData {
    fullName: IInputData;
    rol: IInputData;
    aboutMe: IInputData;
    imageProfile: IInputData;
    curriculumVitae: IInputData;
}

