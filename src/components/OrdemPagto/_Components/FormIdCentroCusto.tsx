import Select from 'react-select'

import {
    FormLabel, FormControl, Box, FormErrorMessage
} from '@chakra-ui/react'

import { IPropsFormOrdemPagto } from './_IPropsForm'

export function FormIdCentroCusto(props: IPropsFormOrdemPagto): JSX.Element {
    const { errors, values, handleChange, setFieldTouched, selectOptions } = props
    return (
        <FormControl display={'flex'} flexDirection={'row'} isInvalid={!!errors.idCentroCusto}>
            <FormLabel alignSelf={'center'} fontSize={'xs'} fontWeight={500} mb={0} width={'100px'}>Centro de Custo:</FormLabel>
            <Box>
                <Select placeholder={'Selecione centro de custo'} className='react-select-custom'
                    options={selectOptions}
                    value={selectOptions?.filter(option => option.value === values.idCentroCusto)[0]}
                    onChange={selectedOption => handleChange('idCentroCusto')(selectedOption.value)}
                    onBlur={() => setFieldTouched('idCentroCusto', true)}
                ></Select>
                <FormErrorMessage fontSize={'fs'} fontWeight={400} width={'300px'}>{errors.idCentroCusto}</FormErrorMessage>
            </Box>
        </FormControl>
    )
}