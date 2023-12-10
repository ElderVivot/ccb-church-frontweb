import { CellProps, Column } from 'react-table'

import { ICentroCusto } from '@api/CentroCusto/ICentroCusto'
import { Box } from '@chakra-ui/react'
import { TFilterProps } from '@common/types/ReactTable'
import { SelectColumnFilter } from '@components/_ColumnFilter'

interface ICellProps extends CellProps<any> {
    value: string
}

export const columnsHeader: Column<ICentroCusto>[] = [
    {
        Header: 'Cód. Centro Custo',
        accessor: 'codeCentroCusto',
        width: '5%',
        disableFilters: true
    },
    {
        Header: 'Nome Centro Custo',
        accessor: 'nameCentroCusto',
        width: '16.1%',
        disableFilters: true
    },
    {
        Header: 'Status',
        accessor: 'statusCentroCusto',
        width: '6.1%',
        Cell: ({ value }: ICellProps): JSX.Element => {
            if (value === 'ACTIVE') return <Box bg={'green.400'} rounded={5} my={0.5} mx={2} fontWeight={500}>Ativa</Box>
            else if (value === 'INACTIVE') return <Box bg={'red.400'} rounded={5} my={0.5} mx={2} fontWeight={500}>Inativa</Box>
        },
        Filter: (props: TFilterProps<object>): JSX.Element => (
            <SelectColumnFilter
                optionsSelect={{ ACTIVE: 'Ativa', INACTIVE: 'Inativa' }}
                {...props}
            />
        ),
        filter: 'equals',
        disableFilters: true
    },
    {
        Header: 'Setor',
        accessor: 'nameSetor',
        width: '6.1%',
        disableFilters: true
    },
    {
        Header: 'Administração',
        accessor: 'nameAdministracao',
        width: '6.1%',
        disableFilters: true
    }
]