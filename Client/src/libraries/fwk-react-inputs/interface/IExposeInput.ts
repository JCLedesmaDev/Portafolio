/* eslint-disable @typescript-eslint/no-explicit-any */
import { IInputProps } from './IInput';
import { IInputCalendarProps } from './IInputCalendar';
import { IInputListProps } from './IInputList';
import { IInputToggleProps } from './IInputToggle';

export interface IExposeInput {
    props: IInputProps;
    reset: () => void;
    set: (val: IInputProps, prop?: string) => void;
    setData: (val: any, prop: string) => void;
}

export interface IExposeInputList {
    props: IInputListProps;
    reset: () => void;
    set: (val: IInputListProps, prop?: string) => void;
    setData: (val: any, prop: string) => void;
}

export interface IExposeInputCalendar {
    props: IInputCalendarProps;
    reset: () => void;
    set: (val: IInputCalendarProps, prop?: string) => void;
    setData: (val: any, prop: string) => void;
}

export interface IExposeInputToggle {
    props: IInputToggleProps;
    reset: () => void;
    set: (val: IInputToggleProps, prop?: string) => void;
    setData: (val: any, prop: string) => void;
}



