import { PropsWithChildren } from 'react'

import { FormControl, FormLabel, Select } from '@chakra-ui/react'

import { IFilters } from '../_interfaces'

interface IProps extends PropsWithChildren<object> {
    filters: IFilters
    setFilters: any
}

const optionsSetor = ['all', '0', '1', '2']

const correlationSetor = (value: string) => {
    if (value === 'all') return 'Todos'
    else if (value === '0') return 'Administração'
    else if (value === '1') return 'Setor 1'
    else if (value === '2') return 'Setor 2'
}

export function SetorComponent({ filters, setFilters }: IProps): JSX.Element {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const eventValue = event.target.value
        setFilters({ ...filters, setor: eventValue })
    }

    return (
        <FormControl mr={2} maxW={'100px'}>
            <FormLabel htmlFor='setor' fontSize={'xs'} mb={0.5}>Setor</FormLabel>
            <Select fontSize={'xs'} h={'1.7rem'} value={filters.setor} onChange={handleChange}>
                {optionsSetor.map((value, key) => (
                    <option key={key} value={value}>{correlationSetor(value)}</option>
                ))}
            </Select>
        </FormControl>
    )
}