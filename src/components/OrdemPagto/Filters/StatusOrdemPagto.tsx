import { PropsWithChildren } from 'react'

import { FormControl, FormLabel, Select } from '@chakra-ui/react'

import { IFilters } from '../_interfaces'

interface IProps extends PropsWithChildren<object> {
    filters: IFilters
    setFilters: any
}

const optionsTypeOrdemPagto = ['all', 'OPENED', 'CANCELED', 'PAYED', 'DELETED', 'LAUNCHED_SYSTEM']

const correlationTypeOrdemPagto = (value: string) => {
    if (value === 'all') return 'Todos'
    else if (value === 'OPENED') return 'Em Aberto'
    else if (value === 'CANCELED') return 'Cancelado'
    else if (value === 'PAYED') return 'Pago'
    else if (value === 'DELETED') return 'Deletado'
    else if (value === 'LAUNCHED_SYSTEM') return 'Lançado SIGA'
}

export function StatusOrdemPagtoComponent({ filters, setFilters }: IProps): JSX.Element {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const eventValue = event.target.value
        setFilters({ ...filters, statusOrdemPagto: eventValue })
    }

    return (
        <FormControl mr={2} maxW={'100px'}>
            <FormLabel htmlFor='statusOrdemPagto' fontSize={'xs'} mb={0.5}>Status Acesso</FormLabel>
            <Select fontSize={'xs'} h={'1.7rem'} value={filters.statusOrdemPagto} onChange={handleChange}>
                {optionsTypeOrdemPagto.map((value, key) => (
                    <option key={key} value={value}>{correlationTypeOrdemPagto(value)}</option>
                ))}
            </Select>
        </FormControl>
    )
}