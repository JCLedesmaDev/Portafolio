import authUser from "./auth.mapper"
import multipleProjects from "./project.mapper"
import multipleTechnologies from "./technology.mapper"
import singleUser from "./user.mapper"

const mappers = {
    singleUser,
    authUser,
    multipleProjects,
    multipleTechnologies
}

export default mappers