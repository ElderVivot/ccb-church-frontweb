import {
    FormLabel, FormControl, Select, Box, FormErrorMessage
} from '@chakra-ui/react'

import { IPropsFormOrdemPagto } from './_IPropsForm'

export function FormPayment(props: IPropsFormOrdemPagto): JSX.Element {
    const { errors, values, handleChange, setFieldTouched } = props
    return (
        <FormControl display={'flex'} flexDirection={'row'} isInvalid={!!errors.formPayment}>
            <FormLabel alignSelf={'center'} fontSize={'xs'} fontWeight={500} mb={0} width={'100px'}>Forma Pagto:</FormLabel>
            <Box>
                <Select h={'2.3rem'} fontSize={'xs'} fontWeight={400} width={'100px'}
                    id={'formPayment'}
                    value={values.formPayment}
                    onChange={selectedOption => handleChange('formPayment')(selectedOption.target.value)}
                    onBlur={() => setFieldTouched('formPayment', true)}
                >
                    <option value={'PIX'}>PIX</option>
                    <option value={'BOLETO'}>BOLETO</option>
                    <option value={'TED'}>TED</option>
                </Select>
                <FormErrorMessage fontSize={'fs'} fontWeight={400} width={'100px'}>{errors.formPayment}</FormErrorMessage>
            </Box>
        </FormControl>
    )
}