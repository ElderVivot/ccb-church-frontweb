import { PropsWithChildren } from 'react'

import { Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'

import { IFilters } from '../_interfaces'

interface IProps extends PropsWithChildren<object> {
    filters: IFilters
    setFilters: any
}

export function SchedulingDateComponent({ filters, setFilters }: IProps): JSX.Element {
    const handleChangePeriodStart = (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventValue = event.target.value
        setFilters({ ...filters, schedulingDateStart: eventValue })
    }

    const handleChangePeriodEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventValue = event.target.value
        setFilters({ ...filters, schedulingDateEnd: eventValue })
    }

    return (
        <FormControl mr={2} maxW={'250px'} >
            <FormLabel htmlFor='competence' fontSize={'xs'} mb={0.5}>Data Agendamento</FormLabel>
            <Flex alignItems={'flex-end'} maxW={'300px'}>
                <Input fontSize={'xs'} h={'1.7rem'} fontWeight={400} p={'5px'} w={'170px'}
                    id='schedulingDateStart'
                    value={filters.schedulingDateStart}
                    onChange={handleChangePeriodStart}
                    type={'date'}
                ></Input>
                <Text fontSize={'xs'} mx={2} mb={1}>até</Text>
                <Input fontSize={'xs'} h={'1.7rem'} fontWeight={400} p={'5px'} w={'170px'}
                    id='schedulingDateEnd'
                    value={filters.schedulingDateEnd}
                    onChange={handleChangePeriodEnd}
                    type={'date'}
                ></Input>
            </Flex>
        </FormControl>
    )
}