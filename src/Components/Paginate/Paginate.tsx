
import ReactPaginate from 'react-paginate';
import PaginateCSS from "./Paginate.module.css"


interface Props {
    ChangePage: ({selected}: any) => void;
    PageCount: number;
    LocatedPageNumber: number | undefined;
}

export const Paginate : React.FC<Props> = (props) => {
    
    const { ChangePage,  PageCount, LocatedPageNumber } = props;
    
    return (
        <ReactPaginate
            nextLabel={"Siguiente"}
            onPageChange={ChangePage}
            previousLabel={"Anterior"}
            
            pageCount={PageCount}
            forcePage={LocatedPageNumber}
            containerClassName={PaginateCSS.PaginationBttns}
            activeClassName={PaginateCSS.paginationActive}
            
            previousLinkClassName={"AnteriorBtn"}
            nextLinkClassName={"SiguienteBtn"}
            disabledClassName={"paginationDisabled"}
        />
    )
}