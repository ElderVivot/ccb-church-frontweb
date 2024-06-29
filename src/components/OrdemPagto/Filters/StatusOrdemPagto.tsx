import { PropsWithChildren } from 'react'

import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import { MultiSelectMenu } from '@components/_MultiSelect'

import { IFilters } from '../_interfaces'

interface IProps extends PropsWithChildren<object> {
    filters: IFilters
    setFilters: any
}

const optionsToFilter = [
    'Todos',
    'Em Aberto',
    'Pago - Etapa 1',
    'Pago - Etapa 2',
    'Lançado no SIGA',
    'Cancelado',
    'Deletado'
]

export function StatusOrdemPagtoComponent({ filters, setFilters }: IProps): JSX.Element {
    const handleChange = (selectedValues: string[]) => {
        const eventValue = selectedValues
        setFilters({ ...filters, statusOrdemPagto: eventValue })
    }

    return (
        <FormControl mr={2} maxW={'150px'}>
            <FormLabel htmlFor='statusOrdemPagto' fontSize={'xs'} mb={0.5}>Status</FormLabel>
            <MultiSelectMenu fontSize={'xs'} h={'1.7rem'}
                buttonProps={{ width: '150px', fontSize: 'xs', h: '1.7rem' }}
                situationAlreadySelected={filters.statusOrdemPagto} onChange={handleChange} options={optionsToFilter}
            />
        </FormControl>
    )
}