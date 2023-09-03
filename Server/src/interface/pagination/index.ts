export interface IFilterPagination {
    page: number;
    filterText?: string;
}

export interface IPagination {
    currentPage: number | undefined;
    totalPages: number;
}