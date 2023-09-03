import { singleCategory } from "./category.mapper"
import { multipleProjects, singleProject } from "./project.mapper"
import { multipleSkills } from "./skills.mapper"
import { multipleTechnologies, singleTechnology } from "./technology.mapper"
import { user } from "./user.mapper"

const mappers = {
    user,
    singleTechnology,
    singleCategory,
    singleProject,
    multipleSkills,
    multipleTechnologies,
    multipleProjects,
}

export default mappers