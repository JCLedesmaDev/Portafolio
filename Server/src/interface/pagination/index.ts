export interface IFilterPagination {
    page: number;
    text?: string;
}

export interface IPagination {
    currentPage: number | undefined;
    totalPages: number;
}