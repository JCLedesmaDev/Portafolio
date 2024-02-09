import { IInputProps, ILoadFileProps } from '@/libraries/index.libraries';
export interface IFormProps {
    fullName: IInputProps;
    rol: IInputProps;
    aboutMe: IInputProps;
    imageProfile: ILoadFileProps;
    curriculumVitae: ILoadFileProps;
}

