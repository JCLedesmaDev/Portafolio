import React, { Fragment } from "react";
import { ImageTechnology } from "../ImageTechnology/ImageTechnology";
import { ITechnology } from "../../../../Interface/ITechnology";

import TechnologysCSS from "./Technologys.module.css"
import { Paginate } from "../../../Paginate/Paginate";


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
        
        <Paginate
          ChangePage={ChangePage}          
          PageCount={PageCount}
          LocatedPageNumber={LocatedPageNumber}
        />
        
      </Fragment>
    );
};