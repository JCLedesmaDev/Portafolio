/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ISubscribe {
    subscribeEventName: string;
    fnResponseWhenEmitEvent: (info: any) => void;
}

export interface IUnsubscribe {
    subscribedEventName: string;
    fnResponseWhenEmitEvent?: (info: any) => void;
}

export interface IEmitToSubscribers {
    subscribedEventName: string;
    args: object | any;
}