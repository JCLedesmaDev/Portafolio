import React, { Fragment } from "react";
import ReactPaginate from 'react-paginate';
import { ImageTechnology } from "../ImageTechnology/ImageTechnology";
import { ITechnology } from "../../../../Interface/ITechnology";

import TechnologysCSS from "./Technologys.module.css"


interface Props {
    ChangePage: ({selected}: any) => void;
    ElementsPaginate: ITechnology[];
    PageCount: number;
    LocatedPageNumber: number | undefined;
}

export const Technologys :React.FC<Props> = (props) => {

    const { ChangePage, ElementsPaginate, PageCount, LocatedPageNumber } = props;

    return (
      
      <Fragment>
          
        <div className={TechnologysCSS.technologyContainer__imagesTechnologys}>
          {
            ElementsPaginate.map((technology: ITechnology, indexTechno: number) => (
              <ImageTechnology key={indexTechno} technology={technology} />
            ))
          }                              
        </div>
        
        <ReactPaginate
          nextLabel={"Siguiente"}
          onPageChange={ChangePage}
          previousLabel={"Anterior"}
          
          pageCount={PageCount}
          forcePage={LocatedPageNumber}
          containerClassName={TechnologysCSS.PaginationBttns}
          activeClassName={TechnologysCSS.paginationActive}
          
          previousLinkClassName={"AnteriorBtn"}
          nextLinkClassName={"SiguienteBtn"}
          disabledClassName={"paginationDisabled"}
        />
        
      </Fragment>
    );
};