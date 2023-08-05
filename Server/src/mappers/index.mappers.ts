import { singleCategory } from "./category.mapper"
import { multipleProjects } from "./project.mapper"
import { multipleSkills } from "./skills.mapper"
import { multipleTechnologies } from "./technology.mapper"
import { user } from "./user.mapper"

const mappers = {
    user,
    multipleProjects,
    multipleTechnologies,
    singleCategory,
    multipleSkills
}

export default mappers