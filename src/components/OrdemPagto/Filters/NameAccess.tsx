import { PropsWithChildren } from 'react'

import { FormControl, FormLabel, Input } from '@chakra-ui/react'

import { IFilters } from '../_interfaces'

interface IProps extends PropsWithChildren<object> {
    filters: IFilters
    setFilters: any
}

export function NameAccessComponent({ filters, setFilters }: IProps): JSX.Element {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventValue = event.target.value
        setFilters({ ...filters, nameAccess: eventValue })
    }

    return (
        <FormControl mr={2} maxW={'250px'}>
            <FormLabel htmlFor='nameAccess' fontSize={'xs'} mb={0.5}>Nome Acesso</FormLabel>
            <Input fontSize={'xs'} h={'1.7rem'} fontWeight={400} width={'250px'} p={'5px'}
                id='nameAccess'
                value={filters.nameAccess}
                onChange={handleChange}
            ></Input>
        </FormControl>
    )
}