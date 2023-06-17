import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useTable, useSortBy, Column, useFilters, usePagination, useRowSelect } from 'react-table'

import { fetchDataAccessPortals } from '@api/tenant/AccessPortals'
import { IAccessPortals } from '@api/tenant/AccessPortals/IAccessPortals'
import { Search2Icon } from '@chakra-ui/icons'
import { Box, Heading, Text, Flex, Button, Spacer, ButtonGroup } from '@chakra-ui/react'
import { THeaderGroup } from '@common/types/ReactTable'
import { CheckboxComponent } from '@components/_CheckboxTable'
import { DefaultColumnFilter } from '@components/_ColumnFilter'
import { PaginationComponent } from '@components/_Pagination'
import { TableComponent } from '@components/_Table/'

import { columnsHeader } from './_columns_header'
import { initialState as initialStateData } from './_initial_state'
import { IFilters } from './_interfaces'
import { AddNewAccessPortals } from './AddNew'
import { FilterComponent } from './Filters'

interface IProps extends PropsWithChildren<object> {
    tenant: string
}

const filterUrl = (filters: IFilters, pageNumber: number, pageSize: number) => {
    const { idTypeAccessPortals, login, nameAccess, statusAccess } = filters
    let url = ''

    if (idTypeAccessPortals && idTypeAccessPortals !== 'all') {
        url += `${url ? '&' : ''}idTypeAccessPortals=${idTypeAccessPortals}`
    }
    if (statusAccess && statusAccess !== 'all') {
        url += `${url ? '&' : ''}status=${statusAccess}`
    }
    if (login) {
        url += `${url ? '&' : ''}loginLikeSearch=${login}`
    }
    if (nameAccess) {
        url += `${url ? '&' : ''}nameAccess=${nameAccess}`
    }

    url += `${url ? '&' : ''}_page=${pageNumber + 1}&_limit=${pageSize}`
    return url
}

export function OrdemPagto(): JSX.Element {
    const [filters, setFilters] = useState<IFilters>({ statusAccess: 'ACTIVE' })
    const [filtersExecuteFetch, setFiltersExecuteFetch] = useState<IFilters>({ statusAccess: 'ACTIVE' })

    const initialState = useMemo(() => initialStateData, [])
    const [pageNumber, setPageNumber] = useState(0)

    const { data: response, isFetching, isSuccess } = useQuery(['access_portals', pageNumber, filtersExecuteFetch], async () => {
        const response = await fetchDataAccessPortals(tenant, `${filterUrl(filtersExecuteFetch, pageNumber, initialState.pageSize)}`)
        return response
    }, {
        staleTime: 1000 * 60 * 5, // 5 minutes,
        keepPreviousData: true
    })

    const data: IAccessPortals[] = useMemo(() => isSuccess ? response.data : [], [response, isSuccess])
    const columns: Column<IAccessPortals>[] = useMemo(() => columnsHeader(tenant, pageNumber, filtersExecuteFetch), [tenant, pageNumber, filtersExecuteFetch])
    const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter, disableFilters: false }), [])

    const tableInstance = useTable<IAccessPortals>(
        {
            columns,
            data,
            defaultColumn,
            initialState: {
                ...initialState,
                pageIndex: pageNumber
            },
            manualPagination: true,
            pageCount: isSuccess ? Math.ceil(Number(response.headers['x-total-count']) / initialState.pageSize) : null
        },
        useFilters, useSortBy, usePagination, useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    width: '1.5%',
                    disableFilters: true,
                    disableSortBy: true,
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <CheckboxComponent {...getToggleAllRowsSelectedProps()} />
                    ),
                    Cell: ({ row }) => <CheckboxComponent {...row.getToggleRowSelectedProps()} />
                },
                ...columns
            ])
        }
    )

    const {
        getTableProps, getTableBodyProps, prepareRow, page, nextPage, previousPage, canNextPage, canPreviousPage,
        pageOptions, state: { pageIndex }, gotoPage, pageCount
    } = tableInstance
    const headerGroups: THeaderGroup<object>[] = tableInstance.headerGroups

    useEffect(() => setPageNumber(pageIndex), [pageIndex])

    if (isFetching || !isSuccess) {
        return (
            <Heading ml={2} as='h3' size='md'>Carregando...</Heading>
        )
    }

    return (
        <Box>
            <Text ml={5} fontSize={'lg'} textAlign={'center'} mt={2} fontWeight={500}>Acesso aos Portais</Text>
            <Flex minWidth='max-content' alignItems='center' gap='2' >
                <Flex w={'75vw'} mb={2} ml={2} alignItems='flex-end'>
                    <FilterComponent filters={filters} setFilters={setFilters} />
                    <Button ml={2} onClick={() => setFiltersExecuteFetch(filters)} size='xs' colorScheme={'orange'} iconSpacing={0} leftIcon={<Search2Icon />} ></Button>
                </Flex>
                <Spacer />
                <ButtonGroup mr={5}>
                    <AddNewAccessPortals />
                </ButtonGroup>
            </Flex>

            <TableComponent
                getTableProps={getTableProps} headerGroups={headerGroups}
                getTableBodyProps={getTableBodyProps} page={page} prepareRow={prepareRow}
                heightToSubtractOfContentBody='210px'
            />
            <PaginationComponent previousPage={previousPage} nextPage={nextPage} canPreviousPage={canPreviousPage} canNextPage={canNextPage}
                pageOptions={pageOptions} pageIndex={pageIndex} gotoPage={gotoPage} pageCount={pageCount}
                pageSize={pageNumber + 1 === pageOptions.length ? Number(response.headers['x-total-count']) % initialState.pageSize : initialState.pageSize}
            />
        </Box>
    )
}