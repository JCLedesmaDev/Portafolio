/* eslint-disable @typescript-eslint/no-explicit-any */
export const initBindingForm = (refs: any, formProps: any) => {
    for (const fields in refs) {
        const formProperty = refs[fields as keyof typeof refs]

        formProperty.current?.set(
            formProps[fields as keyof typeof formProps] as any
        );
        formProperty.current?.setData(
            formProps[fields as keyof typeof formProps].data, '*'
        );
    }
}