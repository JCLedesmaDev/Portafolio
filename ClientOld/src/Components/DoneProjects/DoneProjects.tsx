import React from "react";
import { useMyData } from "../../Hooks/useMyData";

import DoneProjectsCSS from "./DoneProjects.module.css";
import { Paginate } from "../Paginate/Paginate";
import { usePaginate } from "../../Hooks/usePaginate";
import loaderSVG from "../../Static/Spin-1s-200px.svg";
import { Project } from "./Components/Project/Project";


enum Proyect { PER_PAGE = 6 }

export const DoneProjects: React.FC = () => {

  /// HOOKS
  const { doneProjects } = useMyData();
  const {
    elementsPaginate, pageCount,
    locatedPageNumber, loader,
    changePage
  } = usePaginate(Proyect.PER_PAGE, doneProjects?.projects)
  

  return (

    <section
      id="portfolio"
      className={`${DoneProjectsCSS.myProjects} section-space`}
      data-scroll-spy
    >
      <div className={`${DoneProjectsCSS.myProjectsContainer} centerContainer`}>
        <h2 className={` 
         ${DoneProjectsCSS.myProjectsContainer__titulo} section-title`}
        >{doneProjects?.myWorks}</h2>

        {
          loader ? (<img src={loaderSVG} alt="loader" className="loader" />)
          : (
            elementsPaginate.map(
              (project, index) => (<Project project={project} key={index}/>)
            )
          )
        }

        <div className={DoneProjectsCSS.containerPaginate}>
          <Paginate
            ChangePage={changePage}
            PageCount={pageCount}
            LocatedPageNumber={locatedPageNumber}
          />
        </div>

      </div>

    </section>
  );
};