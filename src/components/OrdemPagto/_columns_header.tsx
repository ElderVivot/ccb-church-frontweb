import { CellProps, Column } from 'react-table'

import { IOrdemPagtoList } from '@api/OrdemPagto/IOrdemPagto'
import { Box, Flex, Text } from '@chakra-ui/react'
import { formatDate } from '@common/utils/functions'

import { IFilters } from './_interfaces'
// import { AddNewAccessPortals } from './AddNew'
import { EditCompanieRoutine } from './Edit'

interface ICellProps extends CellProps<any> {
    value: string
    pageNumber: number
    filtersExecuteFetch: IFilters
}

export const columnsHeader = (tenant: string, pageNumber: number, filtersExecuteFetch: IFilters): Column<IOrdemPagtoList>[] => {
    return [
        {
            Header: 'Data',
            accessor: 'createdAt',
            width: '8.1%',
            Cell: ({ value }: ICellProps): string => (formatDate(value, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", 'dd/MM/yyyy'))
        },
        {
            Header: 'Status',
            accessor: 'status',
            width: '7%',
            Cell: ({ value }: ICellProps): JSX.Element => {
                if (value === 'OPENED') return <Box bg={'yellow.400'} rounded={5} my={0.5} mx={2} fontWeight={500}>Em Aberto</Box>
                else if (value === 'PAYED') return <Box bg={'green.400'} rounded={5} my={0.5} mx={2} fontWeight={500}>Pago</Box>
                else if (value === 'CANCELED') return <Box bg={'red.400'} rounded={5} my={0.5} mx={2} fontWeight={500}>Cancelado</Box>
                else if (value === 'DELETED') return <Box bg={'red.400'} rounded={5} my={0.5} mx={2} fontWeight={500}>Deletado</Box>
            }
        },
        {
            Header: 'Nome Fornecedor',
            accessor: 'nameProvider',
            width: '16.1%',
            disableFilters: true
        },
        {
            Header: 'Status',
            accessor: 'status',
            width: '6.1%',
            Cell: ({ value }: ICellProps): JSX.Element => {
                if (value === 'ACTIVE') return <Box bg={'green.400'} rounded={5} my={0.5} mx={2} fontWeight={500}>Ativa</Box>
                else if (value === 'INACTIVE') return <Box bg={'red.400'} rounded={5} my={0.5} mx={2} fontWeight={500}>Inativa</Box>
            },
            disableFilters: true
        },
        {
            Header: 'Forma Pagamento',
            accessor: 'formPayment',
            width: '7%',
            Cell: ({ value, row }: ICellProps): JSX.Element => {
                const { original } = row
                if (original.urlBoleto) return <Box bg={'cyan.400'} rounded={5} my={0.5} mx={2} fontWeight={500}></Box>
                else if (value === 'PAYED') return <Box bg={'orange.400'} rounded={5} my={0.5} mx={2} fontWeight={500}>Pago</Box>
                else if (value === 'CANCELED') return <Box bg={'red.400'} rounded={5} my={0.5} mx={2} fontWeight={500}>Cancelado</Box>
                else if (value === 'DELETED') return <Box bg={'red.400'} rounded={5} my={0.5} mx={2} fontWeight={500}>Deletado</Box>
            }
        },
        {
            Header: 'Atualizado Em',
            accessor: 'updatedAt',
            width: '8.1%',
            disableFilters: true,
            Cell: ({ value }: ICellProps): string => (formatDate(value, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", 'dd/MM/yyyy HH:mm:ss'))
        },
        {
            Header: 'Status Senha',
            accessor: 'timestampPasswordIncorrect',
            width: '6.1%',
            Cell: ({ value, row }: ICellProps): JSX.Element => {
                if (!value) return <Box bg={'green.400'} rounded={5} my={0.5} mx={2} fontWeight={500}>Correta</Box>
                else if (value < row.original.updatedAt) return <Box bg={'green.400'} rounded={5} my={0.5} mx={2} fontWeight={500}>Correta</Box>
                else return <Box bg={'red.400'} rounded={5} my={0.5} mx={2} fontWeight={500}>Incorreta</Box>
            },
            disableFilters: true
        },
        {
            Header: (): JSX.Element => {
                return (
                    <Box display={'flex'} alignItems={'center'}>
                        <Text >Ações</Text>
                        {/* <AddNewAccessPortals tenant={tenant} /> */}
                    </Box>
                )
            },
            accessor: 'idAccessPortals',
            width: '5.1%',
            disableFilters: true,
            disableSortBy: true,
            Cell: ({ row }: ICellProps): JSX.Element => {
                return (
                    <Flex justifyContent={'center'}>
                        <EditCompanieRoutine rowData={row.original} tenant={tenant} pageNumber={pageNumber} filtersExecuteFetch={filtersExecuteFetch} />
                        {/* <DeleteCompanieRoutine idCompanieRoutine={value} tenant={tenant} pageNumber={pageNumber} filtersExecuteFetch={filtersExecuteFetch} /> */}
                    </Flex>
                )
            }
        }
    ]
}