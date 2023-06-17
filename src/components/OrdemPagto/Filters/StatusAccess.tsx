import { PropsWithChildren } from 'react'

import { FormControl, FormLabel, Select } from '@chakra-ui/react'

import { IFilters } from '../_interfaces'

interface IProps extends PropsWithChildren<object> {
    filters: IFilters
    setFilters: any
}

const optionsTypeAccessPortals = ['all', 'ACTIVE', 'INACTIVE']

const correlationTypeAccessPortals = (value: string) => {
    if (value === 'all') return 'Todos'
    else if (value === 'ACTIVE') return 'Ativo'
    else if (value === 'INACTIVE') return 'Inativo'
}

export function StatusAccessPortalsComponent({ filters, setFilters }: IProps): JSX.Element {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const eventValue = event.target.value
        setFilters({ ...filters, statusAccess: eventValue })
    }

    return (
        <FormControl mr={2} maxW={'160px'}>
            <FormLabel htmlFor='statusAccess' fontSize={'xs'} mb={0.5}>Status Acesso</FormLabel>
            <Select fontSize={'xs'} h={'1.7rem'} value={filters.statusAccess} onChange={handleChange}>
                {optionsTypeAccessPortals.map((value, key) => (
                    <option key={key} value={value}>{correlationTypeAccessPortals(value)}</option>
                ))}
            </Select>
        </FormControl>
    )
}