import { PaginateResult } from "mongoose";

interface IPaginationResult<TypeDto> {
    currentPage: number | undefined;
    totalPages: number;
    docs: TypeDto
}
interface IPagination {
    resource: PaginateResult<any>;
    callBackMapper: Function
}


/**
 * Realiza un mapeo tipo de paginaciones.
 * @function
 * @param resource Recursos obtenidos de la paginacion.
 * @param callBackMapper Funcion que realice el mappeo de los docs.
 * @returns {IPaginationResult<TypeDto>} Un objeto del mapeo de la paginacion.
 */
const paginationMapper = <TypeDto>(
    dataPagination: IPagination
): IPaginationResult<TypeDto> => {

    const { resource, callBackMapper } = dataPagination

    const mapper: IPaginationResult<TypeDto> = {
        currentPage: resource.page,
        totalPages: resource.totalPages,
        docs: callBackMapper(resource.docs)
    }
    return mapper
}

export { paginationMapper }