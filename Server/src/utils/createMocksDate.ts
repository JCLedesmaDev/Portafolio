import collections from "@models/index.collections"
import { ApplicationError } from "./applicationError";
import bcrypt from './bcryptPassword'
import config from 'config'

const createMocksDateHandler = async () => {
    try {
        await createUserAdmin()
        await createCategories()
    } catch (error) {
        throw new ApplicationError({ message: 'Ocurrio un error al crear los datos por default', source: error })
    }
}


export { createMocksDateHandler }

const createUserAdmin = async () => {
    const userAdmin = await collections.User.findOne({
        email: config.get("email_admin")
    })
    
    if (userAdmin === null) {
        await collections.User.create({
            email: config.get("email_admin"),
            password: await bcrypt.encrypt(config.get("password_admin")),
        })
    }
}

const createCategories = async () => {
    const categoriesList = await collections.Category.find({})

    if (categoriesList.length === 0) {
        await collections.Category.insertMany([
            { name: 'Front-End:' }, { name: 'Back-End:' },
            { name: 'Otros:' }, { name: 'Proximamente:' },
        ])
    }
}