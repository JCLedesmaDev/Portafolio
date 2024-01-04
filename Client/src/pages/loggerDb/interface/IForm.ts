/* eslint-disable @typescript-eslint/no-explicit-any */
import { IInputData, IInputProps, IInputListData, IInputListProps, IInputCalendarProps, IInputCalendarData } from '@/libraries/index.libraries';

export interface IFormProps {
    dateFrom: IInputCalendarProps;
    dateUntil: IInputCalendarProps;
    limitPage: IInputProps;
    typeEvent: {
        handleChange: (nameField: string, data: any) => void,
        name: string;
        data: {
            value: boolean
        }
    }
    user: IInputListProps;
}

export interface IFormData {
    dateFrom: IInputCalendarData;
    dateUntil: IInputCalendarData;
    typeEvent: {
        value: boolean
    }
    limitPage: IInputData;
    user: IInputListData;
}