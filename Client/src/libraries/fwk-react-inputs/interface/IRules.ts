export interface IRules {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fnCondition: (val: any) => any;
    messageError: string
}