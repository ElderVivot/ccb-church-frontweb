import {
    FormLabel, FormControl, Input, Box, FormErrorMessage
} from '@chakra-ui/react'

import { IPropsFormOrdemPagto } from './_IPropsForm'

export function FormNameProvider(props: IPropsFormOrdemPagto): JSX.Element {
    const { errors, values, handleChange, handleBlur } = props
    return (
        <FormControl display={'flex'} flexDirection={'row'} isInvalid={!!errors.nameProvider} >
            <FormLabel alignSelf={'center'} fontSize={'xs'} fontWeight={500} mb={0} width={'100px'}>Fornecedor:</FormLabel>
            <Box>
                <Input fontSize={'xs'} fontWeight={400} width={'400px'} px={1}
                    id='nameProvider'
                    value={values.nameProvider}
                    onChange={handleChange}
                    onBlur={handleBlur}
                ></Input>
                <FormErrorMessage fontSize={'fs'} fontWeight={400} width={'400px'}>{errors.nameProvider}</FormErrorMessage>
            </Box>
        </FormControl>
    )
}