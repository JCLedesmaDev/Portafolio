import collections from "../models/index.collections"
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
    const userAdmin = await collections.Users.findOne(config.get("email_admin"))

    if (userAdmin === null) {
        await collections.Users.create({
            email: config.get("email_admin"),
            fullName: config.get("userName_admin"),
            password: await bcrypt.encrypt(config.get("password_admin")),
        })
    }
}

const createCategories = async () => {
    const categoriesList = await collections.Categories.find({})

    if (categoriesList.length === 0) {
        await collections.Categories.insertMany([
            { name: 'Front-End:' }, { name: 'Back-End:' },
            { name: 'Otros:' }, { name: 'Proximamente:' },
        ])
    }
}