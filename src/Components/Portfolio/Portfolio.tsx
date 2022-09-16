import React from "react";
import { useMyData } from "../../Hooks/useMyData";

import PortfolioCSS from "./Portfolio.module.css";
import { Paginate } from "../Paginate/Paginate";
import { usePaginate } from "../../Hooks/usePaginate";
import loaderSVG from "../../Static/Spin-1s-200px.svg";
import { Project } from "./Components/Project/Project";


enum Proyect { PER_PAGE = 3 }

export const Portfolio: React.FC = () => {

  /// HOOKS
  const { portfolio } = useMyData();
  const {
    elementsPaginate, pageCount,
    locatedPageNumber, loader,
    changePage
  } = usePaginate(Proyect.PER_PAGE, portfolio?.proyects)
  

  return (

    <section
      id="portfolio"
      className={`${PortfolioCSS.myProjects} section-space`}
      data-scroll-spy
    >
      <div className={`${PortfolioCSS.myProjectsContainer} centerContainer`}>
        <h2 className={` ${PortfolioCSS.myProjectsContainer__titulo} section-title`}>{portfolio?.myWorks}</h2>

        {
          loader ? (<img src={loaderSVG} alt="loader" className="loader" />)
          : (
            elementsPaginate.map((project, index) => (
              <Project project={project} key={index} indexProject={index}/>
            ))
          )
        }

        <div className={PortfolioCSS.containerPaginate}>
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