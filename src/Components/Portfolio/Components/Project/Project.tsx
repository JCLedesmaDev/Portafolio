import { Fragment } from "react"
import { myProjects } from "../../../../Utils/myProjects";
import { useLocation } from "react-use";
import { ModalContainer } from "../../../ModalContainer/ModalContainer";
import ProjectCSS from './Project.module.css'
import { useMyData } from "../../../../Hooks/useMyData";
import { ModalProject } from "../ModalProject/ModalProject";

interface Props {
    project: any;
    indexProject: number
}

export const Project : React.FC<Props> = ({project, indexProject}) => {

    /// VARIABLES
    const location = useLocation().hash;

    /// HOOKS
    const { portfolio } = useMyData();



    return (
      <Fragment>

        <div className={ProjectCSS.portfolioCard}>

          <img
            className={ProjectCSS.portfolioCard__img}
            src={myProjects[indexProject]?.mainImage}
            alt={`trabajo practica ${indexProject}`}
          />

          <a
            href={`#trabajo_${indexProject}`}
            className={ProjectCSS.portfolioCard__info}
          >
            <div className={ProjectCSS.portfolioCard__infoContainer}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className={ProjectCSS.portfolioCard__infoEnlace}>
                <button className="button">{portfolio?.clickMe}</button>
              </div>
            </div>
          </a>

        </div>

        {/* <!-- Ventanas modal del portafolio (en el css, ta todo) --> */}
        <ModalContainer validation={location?.includes(`#trabajo_${indexProject}`)}>
          <ModalProject project={project} indexProject={indexProject}/> 
        </ModalContainer>

      </Fragment>
    )
}