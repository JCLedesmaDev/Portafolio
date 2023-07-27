import * as dotenv from "dotenv"

if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: ".env" });
}

import dbConnect from "./src/database/mongo";
import server from "./src/server"
import config from 'config'

dbConnect()
    .then(() => {
        const connectionServer = config.get('server.public_url') as string
        server.startServer(connectionServer)
    })
    .catch((err: Error) => {
        console.log("No se pudo conectar a la BD", err)
    })





