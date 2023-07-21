import { IColaboratorSchema, IProjectSchema, IUserSchema } from "@models/ICollections";
import { IProject } from "@interface/IProject";
import { IColaborator } from "@interface/IColaborator";


/**
 * Mappea los datos de muchos proyecto 
 * @param resource Recursos a utilizar en el mapper
 * @returns Nuevo objeto con los datos a eleccion
 */
export const multipleProjects = (resource: IProjectSchema[]): IProject[] => {
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
        idUser: (resource.user as IUserSchema).id,
        images: resource.images,
        colaborators: multipleColaborators(resource.colaborators as IColaboratorSchema[])
    }
    return mapper
};

const multipleColaborators = (resource: IColaboratorSchema[]): IColaborator[] => {
    return resource.map((colaborator: IColaboratorSchema) => {
        const mapper: IColaborator = {
            id: colaborator.id,
            name: colaborator.name,
            repositoryLink: colaborator.repositoryLink
        }   
        return mapper
    })
}
