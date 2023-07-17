/**
 * Encapsulador de try-catch
 * @param callback Funcion que se ejecutara dentro del try-catch
 * @returns Devuelve: 1) Lo que retorne el callback | 2) Un error
 */
const tryCatchWrapper = (callback: any) => {
    return async (payload?: any) => {
        try {
            return await callback(payload)
        } catch (error: any) {
            return { error }
        }
    }
}

export { tryCatchWrapper }