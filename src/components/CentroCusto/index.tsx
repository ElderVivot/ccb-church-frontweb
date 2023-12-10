import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useTable, useSortBy, Column, useFilters, usePagination } from 'react-table'

import { fetchDataCentroCusto } from '@api/CentroCusto'
import { ICentroCusto } from '@api/CentroCusto/ICentroCusto'
import { Box, Heading, Text } from '@chakra-ui/react'
import { THeaderGroup } from '@common/types/ReactTable'
import { DefaultColumnFilter } from '@components/_ColumnFilter'
// import { PaginationComponent } from '@components/_Pagination'
import { TableComponent } from '@components/_Table/'
import { columnsHeader } from '@components/CentroCusto/_columns_header'
import { initialState as initialStateData } from '@components/CentroCusto/_initial_state'

export function CentroCusto(): JSX.Element {
    const initialState = useMemo(() => initialStateData, [])

    const [pageNumber, setPageNumber] = useState(0)

    const { data: response, isFetching, isSuccess } = useQuery(['centro_custo'], async () => {
        const response = await fetchDataCentroCusto()
        return response
    }, {
        staleTime: 1000 * 60 * 5, // 5 minutes,
        keepPreviousData: true
    })

    const data: ICentroCusto[] = useMemo(() => isSuccess && response?.data ? response?.data : [], [response, isSuccess])
    const columns: Column<ICentroCusto>[] = useMemo(() => columnsHeader, [])
    const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter, disableFilters: false }), [])

    const tableInstance = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: {
                ...initialState
            }
            // manualPagination: true,
            // pageCount: isSuccess ? Math.ceil(Number(response?.headers['x-total-count']) / initialState.pageSize) : null
        },
        useFilters, useSortBy, usePagination
    )

    const {
        getTableProps, getTableBodyProps, prepareRow, page, nextPage, previousPage, canNextPage, canPreviousPage,
        pageOptions, state: { pageIndex }, gotoPage, pageCount
    } = tableInstance

    const headerGroups: THeaderGroup<ICentroCusto>[] = tableInstance.headerGroups

    useEffect(() => setPageNumber(pageIndex), [pageIndex])

    if (isFetching || !isSuccess) {
        return (
            <Heading ml={2} as='h3' size='md'>Carregando...</Heading>
        )
    }

    return (
        <Box>
            <Text fontSize={'lg'} textAlign={'center'} mt={2} fontWeight={500}>Cadastros de Centro de Custos</Text>

            <TableComponent
                getTableProps={getTableProps} headerGroups={headerGroups}
                getTableBodyProps={getTableBodyProps} page={page} prepareRow={prepareRow}
                heightToSubtractOfContentBody='205px'
            />
            {/* <PaginationComponent previousPage={previousPage} nextPage={nextPage} canPreviousPage={canPreviousPage} canNextPage={canNextPage}
                pageOptions={pageOptions} pageIndex={pageIndex} gotoPage={gotoPage} pageCount={pageCount}
                pageSize={pageNumber + 1 === pageOptions.length ? Number(response.headers['x-total-count']) % initialState.pageSize : initialState.pageSize}
            /> */}
        </Box>
    )
}