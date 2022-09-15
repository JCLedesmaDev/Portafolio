import { useState } from "react";

export const usePaginate = (elementsPerPage: number, elements: any[]) => {

    // https://www.npmjs.com/package/react-paginate
      
    const [locatedPageNumber, setLocatedPageNumber] = useState(0); /// Contador d epagina
    const pageCount = Math.ceil(elements.length / elementsPerPage);
    
    const elementsVisited = locatedPageNumber * elementsPerPage; 
    const elementsPaginate = elements.slice(elementsVisited, elementsVisited + elementsPerPage)
     
    const [loader, setLoader] = useState(false);

    const changePage = ({selected}: any) => {
      setLoader(true);
      setLocatedPageNumber(selected);
      setTimeout(() => setLoader(false), 500);
    };

    return {
        elementsPaginate,
        pageCount,
        locatedPageNumber,
        loader,
        changePage,
        setLoader
    }
}