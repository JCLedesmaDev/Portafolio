/* eslint-disable @typescript-eslint/no-explicit-any */
import { IInputProps, IInputListProps, IInputCalendarProps, IInputToggleProps } from '@/libraries/index.libraries';

export interface IFormProps {
    dateFrom: IInputCalendarProps;
    dateUntil: IInputCalendarProps;
    limitPage: IInputProps;
    typeEvent: IInputToggleProps
    user: IInputListProps;
}