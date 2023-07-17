import bcryptJs from 'bcryptjs'

/**
 * Contraseña sin encriptar
 * @param {*} passwordPlain
 * @returns Retorna la contraseña encriptada
 */
const encrypt = async (passwordPlain: string): Promise<string> => {
    const salt = await bcryptJs.genSalt(10)
    return await bcryptJs.hash(passwordPlain, salt)
}

/**
 * Compara la contrasena recibia con la que tenemos en BD
 * @param {*} passwordPlain Contrasena sin encriptar
 * @param {*} hashPasword Contrasena encriptada
 * @returns Retorna un booleano de igualdad o no.
 */
const compare = async (passwordPlain: string, hashPasword: string): Promise<boolean> => (
    await bcryptJs.compare(passwordPlain, hashPasword)
)

export default {
    encrypt, compare
}