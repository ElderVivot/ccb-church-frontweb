import {
    FormLabel, FormControl, Select, Box, FormErrorMessage
} from '@chakra-ui/react'

import { IPropsFormAccessPortals } from './_IPropsForm'

export function FormStatus(props: IPropsFormAccessPortals): JSX.Element {
    const { errors, values, handleChange, setFieldTouched } = props
    return (
        <FormControl mt={2} display={'flex'} flexDirection={'row'} isInvalid={!!errors.status}>
            <FormLabel fontSize={'xs'} fontWeight={500} mt={2} width={'100px'}>Status Acesso:</FormLabel>
            <Box>
                <Select h={'2.3rem'} fontSize={'xs'} fontWeight={400} width={'110px'}
                    placeholder='Escolha o status'
                    id={'status'}
                    value={values.status}
                    onChange={selectedOption => handleChange('status')(selectedOption.target.value)}
                    onBlur={() => setFieldTouched('status', true)}
                >
                    <option value={'ACTIVE'}>Ativo</option>
                    <option value={'INACTIVE'}>Inativo</option>
                </Select>
                <FormErrorMessage fontSize={'fs'} fontWeight={400} width={'110px'}>{errors.status}</FormErrorMessage>
            </Box>
        </FormControl>
    )
}