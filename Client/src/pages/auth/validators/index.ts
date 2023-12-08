export const validator_Email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i
export const validator_Passowrd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validator = (val: any, pattern: any, message: string) => {
    if (pattern.exec(val)) {
        return true
    } else {
        return message
    }
}