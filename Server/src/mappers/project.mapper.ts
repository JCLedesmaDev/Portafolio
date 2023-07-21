import { IProjectSchema } from "@models/ICollections";
import { IProject } from "@interface/IProject";

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

    }
    return mapper
};

export default multipleProjects ;


