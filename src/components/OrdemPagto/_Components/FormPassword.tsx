import {
    FormLabel, FormControl, Input, Box, FormErrorMessage
} from '@chakra-ui/react'

import { IPropsFormAccessPortals } from './_IPropsForm'

export function FormPassword(props: IPropsFormAccessPortals): JSX.Element {
    const { errors, values, handleChange, handleBlur } = props
    return (
        <FormControl display={'flex'} flexDirection={'row'} isInvalid={!!errors.password} mt={2}>
            <FormLabel fontSize={'xs'} fontWeight={500} mb={0} mt={2} width={'100px'}>Senha:</FormLabel>
            <Box>
                <Input fontSize={'xs'} fontWeight={400} width={'250px'} px={1} type={'password'}
                    id='password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                ></Input>
                <FormErrorMessage fontSize={'fs'} fontWeight={400} width={'250px'}>{errors.password}</FormErrorMessage>
            </Box>
        </FormControl>
    )
}