import { Fragment, useEffect } from "react"
import { useLocation } from "react-use";
import { ModalContainer } from "../../../ModalContainer/ModalContainer";
import ProjectCSS from './Project.module.css'
import { useMyData } from "../../../../Hooks/useMyData";
import { ModalProject } from "../ModalProject/ModalProject";

interface Props {
  project: any;
}

export const Project: React.FC<Props> = ({ project }) => {

  /// HOOKS
  const { doneProjects } = useMyData();

  /// VARIABLES
  const location = useLocation().hash;

  const IndexProject = doneProjects.projects.findIndex(element => element.title === project.title)

  /// METODOS
  const getDataProject = () => doneProjects.projects.find(element => element.title === project.title)?.images

  return (
    <Fragment>

      <div className={ProjectCSS.projectContainer}>

        <img className={ProjectCSS.projectContainer__mainImage}
          src={getDataProject()?.mainImage}
          alt={`trabajo practica ${IndexProject}`}
        />

        <a href={`#trabajo_${IndexProject}`}
          className={ProjectCSS.projectContainer__infoProject}
        >
          <div className={ProjectCSS.projectContainer__infoContainer}>

            <h3>{project.title}</h3>

            <p>{project.description}</p>

            <div className={ProjectCSS.projectContainer__infoEnlace}>
              <button className="button">{doneProjects?.clickMe}</button>
            </div>

          </div>

        </a>

      </div>

      <ModalContainer validation={location?.includes(`#trabajo_${IndexProject}`)}>
        <ModalProject project={project} indexProject={IndexProject} />
      </ModalContainer>

    </Fragment>
  )
}