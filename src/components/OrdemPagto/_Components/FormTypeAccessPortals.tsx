import {
    FormLabel, FormControl, Select, Box, FormErrorMessage
} from '@chakra-ui/react'

import { IPropsFormAccessPortals } from './_IPropsForm'

export function FormTypeAccessPortals(props: IPropsFormAccessPortals): JSX.Element {
    const { errors, values, handleChange, setFieldTouched } = props
    return (
        <FormControl mt={2} display={'flex'} flexDirection={'row'} isInvalid={!!errors.idTypeAccessPortals}>
            <FormLabel fontSize={'xs'} fontWeight={500} mb={0} mt={2} width={'100px'}>Tipo Acesso:</FormLabel>
            <Box>
                <Select h={'2.3rem'} fontSize={'xs'} fontWeight={400} width={'300px'}
                    id={'idTypeAccessPortals'}
                    value={values.idTypeAccessPortals}
                    onChange={selectedOption => handleChange('idTypeAccessPortals')(selectedOption.target.value)}
                    onBlur={() => setFieldTouched('idTypeAccessPortals', true)}
                >
                    <option value={'6a009e00-47b0-4e45-a28f-87a3481b2060'}>Prefeitura Goiânia</option>
                </Select>
                <FormErrorMessage fontSize={'fs'} fontWeight={400} width={'110px'}>{errors.idTypeAccessPortals}</FormErrorMessage>
            </Box>
        </FormControl>
    )
}