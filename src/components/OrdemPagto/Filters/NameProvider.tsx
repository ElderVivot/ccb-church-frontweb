import { PropsWithChildren } from 'react'

import { FormControl, FormLabel, Input } from '@chakra-ui/react'

import { IFilters } from '../_interfaces'

interface IProps extends PropsWithChildren<object> {
    filters: IFilters
    setFilters: any
}

export function NameProviderComponent({ filters, setFilters }: IProps): JSX.Element {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventValue = event.target.value
        setFilters({ ...filters, nameProvider: eventValue })
    }

    return (
        <FormControl mr={2} maxW={'200px'}>
            <FormLabel htmlFor='nameProvider' fontSize={'xs'} mb={0.5}>Nome Fornecedor</FormLabel>
            <Input fontSize={'xs'} h={'1.7rem'} fontWeight={400} width={'200px'} p={'5px'}
                id='nameProvider'
                value={filters.nameProvider}
                onChange={handleChange}
            ></Input>
        </FormControl>
    )
}