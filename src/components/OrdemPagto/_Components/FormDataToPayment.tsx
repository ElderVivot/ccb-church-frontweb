import {
    FormLabel, FormControl, Input, Box, FormErrorMessage
} from '@chakra-ui/react'

import { IPropsFormOrdemPagto } from './_IPropsForm'

export function FormDataToPayment(props: IPropsFormOrdemPagto): JSX.Element {
    const { errors, values, handleChange, handleBlur } = props
    return (
        <FormControl display={'flex'} flexDirection={'row'} isInvalid={!!errors.dataToPayment} >
            <FormLabel alignSelf={'center'} fontSize={'xs'} fontWeight={500} mb={0} width={'100px'}>Dados pra Pagto:</FormLabel>
            <Box >
                <Input fontSize={'xs'} fontWeight={400} width={'500px'} px={1}
                    id='dataToPayment'
                    value={values.dataToPayment}
                    onChange={handleChange}
                    onBlur={handleBlur}
                ></Input>
                <FormErrorMessage fontSize={'fs'} fontWeight={400} width={'500px'}>{errors.dataToPayment}</FormErrorMessage>
            </Box>
        </FormControl>
    )
}