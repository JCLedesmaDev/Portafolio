/* eslint-disable @typescript-eslint/no-explicit-any */
export const initBindingForm = (refs: any, formProps: any) => {
    for (const fields in refs) {
        const formProperty = refs[fields as keyof typeof refs]

        const data = formProps[fields as keyof typeof formProps].data
        delete formProps[fields as keyof typeof formProps].data

        formProperty.current?.set(
            formProps[fields as keyof typeof formProps] as any
        );
        formProperty.current?.setData(data, '*');
    }
}