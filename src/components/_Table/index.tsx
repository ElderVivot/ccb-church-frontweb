import { TablePropGetter, TableBodyPropGetter, TableBodyProps, TableProps, Row } from 'react-table'

import { Box, calc, Table, TableProps as TablePropsChakra } from '@chakra-ui/react'
import { THeaderGroup } from '@common/types/ReactTable'

import { TBodyComponent } from './TBody'
import { THeadComponent } from './THead'

interface IPropsTable extends TablePropsChakra {
    getTableProps: (propGetter?: TablePropGetter<object>) => TableProps
    headerGroups: THeaderGroup<object>[]
    getTableBodyProps: (propGetter?: TableBodyPropGetter<object>) => TableBodyProps
    prepareRow: (row: Row<object>) => void
    heightToSubtractOfContentBody: string
    page: Array<Row<object>>
}

export function TableComponent (props: IPropsTable): JSX.Element {
    const { getTableProps, headerGroups, getTableBodyProps, prepareRow, heightToSubtractOfContentBody, page } = props

    return (
        <Box overflow={'auto'} maxH={calc.subtract(`100vh - ${heightToSubtractOfContentBody}`)} width={'98.4vw'} ml={2}>
            <Table {...getTableProps()} >
                <THeadComponent headerGroups={headerGroups} />
                <TBodyComponent getTableBodyProps={getTableBodyProps} page={page} prepareRow={prepareRow}/>
            </Table>

        </Box>
    )
}