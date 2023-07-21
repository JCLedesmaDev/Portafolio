import { IProjectSchema } from "@models/ICollections";
import { IProject } from "@interface/IProject";
import { IUser } from "@interface/IUser";

const multipleProjects = (resource: IProjectSchema[]): IProject[] => {
    return resource.map(project => singleProject(project))
}

/**
 * Mappea los datos de un proyecto 
 * @param resource Recursos a utilizar en el mapper
 * @returns Nuevo objeto con los datos a eleccion
 */
const singleProject = (resource: IProjectSchema): IProject => {
    const mapper: IProject = {
        id: resource._id,
        description: resource.description,
        details: resource.details,
        name: resource.name,
        periodTimeFrom: resource.periodTimeFrom,
        periodTimeTo: resource.periodTimeTo,
        projectLink: resource.projectLink,
        repositoryLink: resource.repositoryLink,
        typeProject: resource.typeProject,
        user: resource.user as IUser,
        colaborators: [],
        images: []
    }
    return mapper
};

export default multipleProjects;


