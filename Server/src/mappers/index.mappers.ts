import { multipleCategories, singleCategory } from "./category.mapper"
import { pagination } from "./pagination.mapper"
import { multipleProjects, singleProject } from "./project.mapper"
import { multipleLoggerDb } from "./loggerDb.mapper"
import { multipleSkills } from "./skills.mapper"
import { multipleTechnologies, singleTechnology } from "./technology.mapper"
import { singleUser, multipleUsers } from "./user.mapper"

const mappers = {
    singleUser,
    pagination,
    singleTechnology,
    singleCategory,
    singleProject,
    multipleUsers,
    multipleSkills,
    multipleTechnologies,
    multipleCategories,
    multipleProjects,
    multipleLoggerDb
}

export default mappers