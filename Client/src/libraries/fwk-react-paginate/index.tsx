/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactPaginate from 'react-paginate';
import css from "./index.module.css"


interface Props {
    changePage: ({ selected }: any) => void;
    pagesTotal: number;
    pageActual: number | undefined;
    styleContainer?: any;
    styleBtnActive?: any;
    btnNextText: string;
    btnPreviousText: string;
}

export const Paginate: React.FC<Props> = (props) => {

    // https://www.npmjs.com/package/react-paginate

    const { changePage } = props;

    return (
        <ReactPaginate
            nextLabel={props.btnNextText}
            onPageChange={changePage}
            previousLabel={props.btnPreviousText}

            pageCount={props.pagesTotal}
            forcePage={props.pageActual}
            containerClassName={`${css.container} ${props.styleContainer}`}
            activeClassName={`${css.btnActive} ${props.styleBtnActive}`}
            pageRangeDisplayed={1}
        />
    )
}