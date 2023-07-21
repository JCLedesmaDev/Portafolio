import { authUser } from "./auth.mapper"
import { multipleProjects } from "./project.mapper"
import { multipleTechnologies } from "./technology.mapper"
import { user } from "./user.mapper"

const mappers = {
    user,
    authUser,
    multipleProjects,
    multipleTechnologies
}

export default mappers