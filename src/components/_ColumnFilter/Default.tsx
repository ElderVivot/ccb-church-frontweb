import { Input } from '@chakra-ui/react'
import { TFilterProps } from '@common/types/ReactTable'

export function DefaultColumnFilter (props: TFilterProps<object>): JSX.Element {
    const { column } = props

    return (
        <Input
            bgColor={'palette.2.2'} fontSize={'fs'} p={1} height={6} textAlign={'center'}
            value={column.filterValue || ''}
            onChange={e => {
                column.setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={'Filtro'}
        />
    )
}