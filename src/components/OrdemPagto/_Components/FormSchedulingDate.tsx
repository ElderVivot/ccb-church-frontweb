import {
    FormLabel, FormControl, Input, Box, FormErrorMessage
} from '@chakra-ui/react'

import { IPropsFormOrdemPagto } from './_IPropsForm'

export function FormSchedulingDate(props: IPropsFormOrdemPagto): JSX.Element {
    const { errors, values, handleChange, handleBlur } = props
    return (
        <FormControl display={'flex'} flexDirection={'row'} isInvalid={!!errors.schedulingDate} >
            <FormLabel alignSelf={'center'} fontSize={'xs'} fontWeight={500} mb={0} width={'100px'} >Data pra Pagto:</FormLabel>
            <Box>
                <Input fontSize={'xs'} fontWeight={400} width={'150px'} px={1} type='date'
                    id='schedulingDate'
                    value={values.schedulingDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                ></Input>
                <FormErrorMessage fontSize={'fs'} fontWeight={400} width={'150px'}>{errors.schedulingDate}</FormErrorMessage>
            </Box>
        </FormControl>
    )
}