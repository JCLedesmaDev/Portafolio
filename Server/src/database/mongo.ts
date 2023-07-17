import { CallbackError, connect, ConnectOptions, set } from "mongoose"
import config from 'config'

const DB_URI: string = config.get('connectionBD') as string
const options: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as ConnectOptions


set('strictQuery', false)
const dbConnect = async (): Promise<void> => {
    connect(DB_URI, options, (cbError: CallbackError) => {
        if (!cbError) {
            console.log(`⚡️[bd]: BaseDatos is running at ${DB_URI}`)
        } else {
            console.log("ERROR DE CONEXION", cbError.stack)
        }
    })
}

export default dbConnect
