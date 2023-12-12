import { FaFileAlt, FaFileInvoiceDollar, FaFilePrescription, FaFileContract, FaFileDownload } from 'react-icons/fa'
import { CellProps, Column } from 'react-table'

import { IOrdemPagto } from '@api/OrdemPagto/IOrdemPagto'
import { Box, Button, Flex, Text, Tooltip } from '@chakra-ui/react'
import { formatDate } from '@common/utils/functions'

import { IFilters } from './_interfaces'
// import { AddNewAccessPortals } from './AddNew'
import { EditOrdemPagto } from './Edit'

interface ICellProps extends CellProps<any> {
    value: string
    pageNumber: number
    filtersExecuteFetch: IFilters
}

export const columnsHeader = (pageNumber: number, filtersExecuteFetch: IFilters, centroCusto, paymentObjective): Column<IOrdemPagto>[] => {
    return [
        {
            Header: 'Data pra Pagto',
            accessor: 'schedulingDate',
            width: '4.1%',
            Cell: ({ value }: ICellProps): string => (formatDate(value, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", 'dd/MM/yyyy')),
            disableFilters: true
        },
        {
            Header: 'Centro Custo',
            accessor: 'namesCentroCusto',
            width: '8.1%',
            disableFilters: true
        },
        {
            Header: 'Valor',
            accessor: 'amountOrdemPagto',
            width: '4.1%',
            disableFilters: true,
            Cell: ({ value }: ICellProps): string => Number(value).toFixed(2).toString().replace('.', ',')
        },
        {
            Header: 'Status',
            accessor: 'status',
            width: '5%',
            Cell: ({ value }: ICellProps): JSX.Element => {
                if (value === 'OPENED') return <Box bg={'yellow.400'} rounded={5} my={0.5} mx={0.5} fontWeight={500}>Em Aberto</Box>
                else if (value === 'PAYED') return <Box bg={'orange.400'} rounded={5} my={0.5} mx={0.5} fontWeight={500}>Pago</Box>
                else if (value === 'CANCELED') return <Box bg={'red.400'} rounded={5} my={0.5} mx={0.5} fontWeight={500}>Cancelado</Box>
                else if (value === 'DELETED') return <Box bg={'red.400'} rounded={5} my={0.5} mx={0.5} fontWeight={500}>Deletado</Box>
                else if (value === 'LAUNCHED_SYSTEM') return <Box bg={'green.400'} rounded={5} my={0.5} mx={0.5} fontWeight={500}>Lançado</Box>
            },
            disableFilters: true
        },
        {
            Header: 'Nome Fornecedor',
            accessor: 'nameProvider',
            width: '10.1%',
            disableFilters: true
        },
        {
            Header: 'Forma Pagto',
            accessor: 'formPayment',
            width: '3.1%',
            disableFilters: true
        },
        {
            Header: 'Atualizado Em',
            accessor: 'updatedAt',
            width: '4.1%',
            disableFilters: true,
            Cell: ({ value }: ICellProps): string => (formatDate(value, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", 'dd/MM/yyyy HH:mm:ss'))
        },
        {
            Header: 'Núm NF',
            accessor: 'numberNote',
            width: '3.1%',
            disableFilters: true
        },
        {
            Header: 'Núm Pedido',
            accessor: 'numberOrder',
            width: '3.1%',
            disableFilters: true
        },
        {
            Header: 'Dados pra Pagto',
            accessor: 'dataToPayment',
            width: '10.1%',
            disableFilters: true
        },
        {
            Header: 'Informações adicionais',
            accessor: 'additionalDescription',
            width: '10.1%',
            disableFilters: true
        },
        {
            Header: (): JSX.Element => {
                return (
                    <Box display={'flex'} alignItems={'center'}>
                        <Text >Arquivos / Ações</Text>
                    </Box>
                )
            },
            accessor: 'urlBoleto',
            width: '0.1%',
            disableFilters: true,
            disableSortBy: true,
            Cell: ({ row }: ICellProps): JSX.Element => {
                return (
                    <Flex justifyContent={'center'} alignItems={'center'} >
                        <Tooltip label='Abrir Boleto' >
                            <Button as='a' iconSpacing={0} m={0} p={0} border={0} size='sm' bg={'transparent'}
                                href={row.original.urlBoleto} target="_blank"
                                isDisabled={!row.original.urlBoleto} leftIcon={<FaFileInvoiceDollar />}
                            />
                        </Tooltip>
                        <Tooltip label='Abrir Nota Fiscal' >
                            <Button as='a' iconSpacing={0} m={0} p={0} border={0} size='sm' bg={'transparent'}
                                href={row.original.urlNF} target="_blank" rel="noopener noreferrer"
                                isDisabled={!row.original.urlNF} leftIcon={<FaFileContract />}
                            />
                        </Tooltip>
                        <Tooltip label='Abrir Pedido Compra' >
                            <Button as='a' iconSpacing={0} m={0} p={0} border={0} size='sm' bg={'transparent'}
                                href={row.original.urlOrder} target="_blank" rel="noopener noreferrer"
                                isDisabled={!row.original.urlOrder} leftIcon={<FaFilePrescription />}
                            />
                        </Tooltip>
                        <Tooltip label='Abrir Dados Pra Pagto' >
                            <Button as='a' iconSpacing={0} m={0} p={0} border={0} size='sm' bg={'transparent'}
                                href={row.original.urlDataToPayment} target="_blank" rel="noopener noreferrer"
                                isDisabled={!row.original.urlDataToPayment} leftIcon={<FaFileAlt />}
                            />
                        </Tooltip>
                        <Tooltip label='Abrir Comprovante Pagto' mr={2}>
                            <Button as='a' iconSpacing={0} m={0} p={0} border={0} size='sm' bg={'transparent'}
                                href={row.original.urlPaymentProof} target="_blank" rel="noopener noreferrer"
                                isDisabled={!row.original.urlPaymentProof} leftIcon={<FaFileDownload />}
                            />
                        </Tooltip>
                        <EditOrdemPagto rowData={{
                            ...row.original,
                            schedulingDate: row.original.schedulingDate.substring(0, 10),
                            amountOrdemPagto: Number(row.original.amountOrdemPagto)
                        }} pageNumber={pageNumber} filtersExecuteFetch={filtersExecuteFetch} centroCusto={centroCusto} paymentObjective={paymentObjective} />

                    </Flex>
                )
            }
        }
    ]
}