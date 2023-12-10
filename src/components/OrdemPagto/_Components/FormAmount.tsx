import {
    FormLabel, FormControl, Input, Box, FormErrorMessage
} from '@chakra-ui/react'

import { IPropsFormOrdemPagto } from './_IPropsForm'

export function FormAmount(props: IPropsFormOrdemPagto): JSX.Element {
    const { errors, values, handleChange, handleBlur } = props
    return (
        <FormControl display={'flex'} flexDirection={'row'} isInvalid={!!errors.amountOrdemPagto} >
            <FormLabel alignSelf={'center'} fontSize={'xs'} fontWeight={500} mb={0} width={'100px'}>Valor à Pagar:</FormLabel>
            <Box>
                <Input fontSize={'xs'} fontWeight={400} width={'150px'} px={1} type='number'
                    id='amountOrdemPagto'
                    value={values.amountOrdemPagto}
                    onChange={handleChange}
                    onBlur={handleBlur}
                ></Input>
                <FormErrorMessage fontSize={'fs'} fontWeight={400} width={'150px'}>{errors.amountOrdemPagto}</FormErrorMessage>
            </Box>
        </FormControl>
    )
}