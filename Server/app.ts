import * as dotenv from "dotenv"

if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: ".env" });
}

import dbConnect from "./src/database/mongo";
import server from "./src/server"
import config from 'config'

if (!config.get('server.port')) {
    console.log(`Error to get ports`);
    process.exit(1);
}

dbConnect()
    .then(() => {
        const connectionServer = process.env.NODE_ENV === "production"
            ? config.get('server.public_url') as string
            : `${config.get('server.public_url')}${config.get('server.port')}`

        server.startServer(connectionServer)
    })
    .catch((err: Error) => {
        console.log("No se pudo conectar a la BD", err)
    })





