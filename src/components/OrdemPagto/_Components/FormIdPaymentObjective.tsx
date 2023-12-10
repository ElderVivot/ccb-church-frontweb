import Select from 'react-select'

import {
    FormLabel, FormControl, Box, FormErrorMessage
} from '@chakra-ui/react'

import { IPropsFormOrdemPagto } from './_IPropsForm'

export function FormIdPaymentObjective(props: IPropsFormOrdemPagto): JSX.Element {
    const { errors, values, handleChange, setFieldTouched, selectOptions } = props
    return (
        <FormControl display={'flex'} flexDirection={'row'} isInvalid={!!errors.idPaymentObjective}>
            <FormLabel alignSelf={'center'} fontSize={'xs'} fontWeight={500} mb={0} width={'100px'}>Finalidade Pagto:</FormLabel>
            <Box>
                <Select placeholder={'Selecione finalidade da despesa'} className='react-select-custom'
                    options={selectOptions}
                    value={selectOptions?.filter(option => option.value === values.idPaymentObjective)[0]}
                    onChange={selectedOption => handleChange('idPaymentObjective')(selectedOption.value)}
                    onBlur={() => setFieldTouched('idPaymentObjective', true)}
                ></Select>
                <FormErrorMessage fontSize={'fs'} fontWeight={400} width={'300px'}>{errors.idPaymentObjective}</FormErrorMessage>
            </Box>
        </FormControl>
    )
}