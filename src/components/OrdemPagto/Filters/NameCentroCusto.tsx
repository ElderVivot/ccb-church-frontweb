import { PropsWithChildren } from 'react'

import { FormControl, FormLabel, Input } from '@chakra-ui/react'

import { IFilters } from '../_interfaces'

interface IProps extends PropsWithChildren<object> {
    filters: IFilters
    setFilters: any
}

export function NameCentroCustoComponent({ filters, setFilters }: IProps): JSX.Element {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventValue = event.target.value
        setFilters({ ...filters, nameCentroCusto: eventValue })
    }

    return (
        <FormControl mr={2} maxW={'200px'}>
            <FormLabel htmlFor='nameCentroCusto' fontSize={'xs'} mb={0.5}>Nome Centro Custo</FormLabel>
            <Input fontSize={'xs'} h={'1.7rem'} fontWeight={400} width={'200px'} p={'5px'}
                id='nameCentroCusto'
                value={filters.nameCentroCusto}
                onChange={handleChange}
            ></Input>
        </FormControl>
    )
}