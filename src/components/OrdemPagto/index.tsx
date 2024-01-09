import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useTable, useSortBy, Column, useFilters, usePagination, useRowSelect } from 'react-table'

import { fetchDataCentroCusto } from '@api/CentroCusto'
import { fetchDataOrdemPagto } from '@api/OrdemPagto'
import { IOrdemPagto } from '@api/OrdemPagto/IOrdemPagto'
import { fetchDataPaymentObjective } from '@api/PaymentOjective'
import { Search2Icon } from '@chakra-ui/icons'
import { Box, Heading, Text, Flex, Button, Spacer, ButtonGroup } from '@chakra-ui/react'
import { THeaderGroup } from '@common/types/ReactTable'
import { formatDate } from '@common/utils/functions'
import { CheckboxComponent } from '@components/_CheckboxTable'
import { DefaultColumnFilter } from '@components/_ColumnFilter'
import { PaginationComponent } from '@components/_Pagination'
import { TableComponent } from '@components/_Table/'

import { columnsHeader } from './_columns_header'
import { initialState as initialStateData } from './_initial_state'
import { IFilters } from './_interfaces'
import { AddNewOrdemPagto } from './AddNew'
import { FilterComponent } from './Filters'
import { UpdateStatusOrdemPagto } from './UpdateStatus'

const filterUrl = (filters: IFilters, pageNumber: number, pageSize: number) => {
    const { nameCentroCusto, nameProvider, schedulingDateEnd, schedulingDateStart, statusOrdemPagto, setor } = filters
    let url = ''

    if (statusOrdemPagto && statusOrdemPagto !== 'all') {
        url += `${url ? '&' : ''}status=${statusOrdemPagto}`
    }
    if (setor && setor !== 'all') {
        url += `${url ? '&' : ''}numberSetor=${setor}`
    }
    if (nameCentroCusto) {
        url += `${url ? '&' : ''}nameCentroCusto=${nameCentroCusto.toUpperCase().replaceAll(' ', '%20')}`
    }
    if (nameProvider) {
        url += `${url ? '&' : ''}nameProvider=${nameProvider.toUpperCase().replaceAll(' ', '%20')}`
    }
    if (schedulingDateStart && schedulingDateEnd) {
        url += `${url ? '&' : ''}schedulingDateStart=${schedulingDateStart}&schedulingDateEnd=${schedulingDateEnd}`
    }

    url += `${url ? '&' : ''}_page=${pageNumber + 1}&_limit=${pageSize}`

    return url
}

export function OrdemPagto(): JSX.Element {
    const today = new Date()
    const [filters, setFilters] = useState<IFilters>({
        schedulingDateStart: formatDate(new Date(today.getFullYear(), today.getMonth(), 1), '', 'yyyy-MM-dd'),
        schedulingDateEnd: formatDate(today, '', 'yyyy-MM-dd'),
        statusOrdemPagto: 'OPENED'
    })
    const [filtersExecuteFetch, setFiltersExecuteFetch] = useState<IFilters>({
        schedulingDateStart: formatDate(new Date(today.getFullYear(), today.getMonth(), 1), '', 'yyyy-MM-dd'),
        schedulingDateEnd: formatDate(today, '', 'yyyy-MM-dd'),
        statusOrdemPagto: 'OPENED'
    })

    const initialState = useMemo(() => initialStateData, [])
    const [pageNumber, setPageNumber] = useState(0)
    const [centroCusto, setCentroCusto] = useState<{ value: string, label: string }[]>([])
    const [paymentObjective, setPaymentObjective] = useState<{ value: string, label: string }[]>([])

    useMemo(() => {
        fetchDataCentroCusto().then(responseCentroCusto => {
            const centroCustoList = []
            setCentroCusto([])
            // console.log(responseCentroCusto.data)
            for (const cc of responseCentroCusto.data) {
                centroCustoList.push({ value: cc.idCentroCusto, label: `${cc.nameCentroCusto} | ${cc.codeCentroCusto}` })
            }
            setCentroCusto(centroCustoList)
        }).catch(_ => setCentroCusto([]))
    }, [])

    useMemo(() => {
        fetchDataPaymentObjective().then(responsePayment => {
            const paymentObjectiveList = []
            setPaymentObjective([])
            for (const payment of responsePayment.data) {
                paymentObjectiveList.push({ value: payment.idPaymentObjective, label: payment.name })
            }
            setPaymentObjective(paymentObjectiveList)
        }).catch(_ => setPaymentObjective([]))
    }, [])

    const { data: response, isFetching, isSuccess } = useQuery(['ordem_pagto', pageNumber, filtersExecuteFetch], async () => {
        const response = await fetchDataOrdemPagto(`${filterUrl(filtersExecuteFetch, pageNumber, initialState.pageSize)}`)
        return response
    }, {
        staleTime: 1000 * 60 * 10, // 10 minutes,
        keepPreviousData: true,
        refetchOnWindowFocus: false
    })

    const data: IOrdemPagto[] = useMemo(() => isSuccess ? response?.data : [], [response, isSuccess])
    const columns: Column<IOrdemPagto>[] = useMemo(() => columnsHeader(pageNumber, filtersExecuteFetch, centroCusto, paymentObjective), [pageNumber, filtersExecuteFetch, centroCusto, paymentObjective])
    const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter, disableFilters: false }), [])

    const tableInstance = useTable<IOrdemPagto>(
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
        pageOptions, state: { pageIndex }, gotoPage, pageCount, selectedFlatRows
    } = tableInstance
    const headerGroups: THeaderGroup<object>[] = tableInstance.headerGroups

    useEffect(() => setPageNumber(pageIndex), [pageIndex])
    useEffect(() => setPageNumber(0), [filters])

    if (isFetching || !isSuccess) {
        return (
            <Heading ml={2} as='h3' size='md'>Carregando...</Heading>
        )
    }

    return (
        <Box>
            <Text ml={5} fontSize={'lg'} textAlign={'center'} mt={1} mb={2} fontWeight={500}>Ordens de Pagamento</Text>
            <Flex minWidth='max-content' alignItems='center' gap='2' >
                <Flex w={'75vw'} mb={2} ml={2} alignItems='flex-end'>
                    <FilterComponent filters={filters} setFilters={setFilters} />
                    <Button ml={2} onClick={() => setFiltersExecuteFetch(filters)} size='xs' colorScheme={'orange'} iconSpacing={0} leftIcon={<Search2Icon />} ></Button>
                </Flex>
                <Spacer />
                <ButtonGroup mr={5} mb={2}>
                    <UpdateStatusOrdemPagto selectedFlatRows={selectedFlatRows} filtersExecuteFetch={filtersExecuteFetch} pageNumber={pageNumber} />
                    <AddNewOrdemPagto centroCusto={centroCusto} paymentObjective={paymentObjective} filtersExecuteFetch={filtersExecuteFetch} pageNumber={pageNumber} />
                </ButtonGroup>
            </Flex>

            <TableComponent
                getTableProps={getTableProps} headerGroups={headerGroups}
                getTableBodyProps={getTableBodyProps} page={page} prepareRow={prepareRow}
                heightToSubtractOfContentBody='210px'
            />
            <PaginationComponent previousPage={previousPage} nextPage={nextPage} canPreviousPage={canPreviousPage} canNextPage={canNextPage}
                pageOptions={pageOptions} pageIndex={pageIndex} gotoPage={gotoPage} pageCount={pageCount}
                pageSize={pageNumber + 1 === pageOptions.length || pageNumber === 0 ? Number(response.headers['x-total-count']) % initialState.pageSize : initialState.pageSize}
            />
        </Box>
    )
}