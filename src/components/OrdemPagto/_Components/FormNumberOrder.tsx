import {
    FormLabel, FormControl, Input, Box, FormErrorMessage
} from '@chakra-ui/react'

import { IPropsFormOrdemPagto } from './_IPropsForm'

export function FormNumberOrder(props: IPropsFormOrdemPagto): JSX.Element {
    const { errors, values, handleChange, handleBlur } = props
    return (
        <FormControl display={'flex'} flexDirection={'row'} isInvalid={!!errors.numberOrder} >
            <FormLabel fontStyle={'italic'} alignSelf={'center'} fontSize={'xs'} fontWeight={500} mb={0} width={'100px'}>Núm. Pedido:</FormLabel>
            <Box>
                <Input fontSize={'xs'} fontWeight={400} width={'150px'} px={1}
                    id='numberOrder'
                    value={values.numberOrder}
                    onChange={handleChange}
                    onBlur={handleBlur}
                ></Input>
                <FormErrorMessage fontSize={'fs'} fontWeight={400} width={'150px'}>{errors.numberOrder}</FormErrorMessage>
            </Box>
        </FormControl>
    )
}