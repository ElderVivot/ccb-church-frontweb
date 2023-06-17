import { PropsWithChildren } from 'react'

import { FormControl, FormLabel, Input } from '@chakra-ui/react'

import { IFilters } from '../_interfaces'

interface IProps extends PropsWithChildren<object> {
    filters: IFilters
    setFilters: any
}

export function LoginComponent({ filters, setFilters }: IProps): JSX.Element {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventValue = event.target.value
        setFilters({ ...filters, login: eventValue })
    }

    return (
        <FormControl mr={2} maxW={'180px'}>
            <FormLabel htmlFor='login' fontSize={'xs'} mb={0.5}>Login</FormLabel>
            <Input fontSize={'xs'} h={'1.7rem'} fontWeight={400} width={'180px'} p={'5px'}
                id='login'
                value={filters.login}
                onChange={handleChange}
            ></Input>
        </FormControl>
    )
}