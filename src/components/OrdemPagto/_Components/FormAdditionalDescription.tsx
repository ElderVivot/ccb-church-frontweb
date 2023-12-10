import {
    FormLabel, FormControl, Input, Box, FormErrorMessage
} from '@chakra-ui/react'

import { IPropsFormOrdemPagto } from './_IPropsForm'

export function FormAdditionalDescription(props: IPropsFormOrdemPagto): JSX.Element {
    const { errors, values, handleChange, handleBlur } = props
    return (
        <FormControl display={'flex'} flexDirection={'row'} isInvalid={!!errors.additionalDescription} >
            <FormLabel fontStyle={'italic'} alignSelf={'center'} fontSize={'xs'} fontWeight={500} mb={0} width={'100px'}>Descrição Adicional:</FormLabel>
            <Box>
                <Input fontSize={'xs'} fontWeight={400} width={'500px'} px={1}
                    id='additionalDescription'
                    value={values.additionalDescription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                ></Input>
                <FormErrorMessage fontSize={'fs'} fontWeight={400} width={'500px'}>{errors.additionalDescription}</FormErrorMessage>
            </Box>
        </FormControl>
    )
}