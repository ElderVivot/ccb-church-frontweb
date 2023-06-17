import {
    FormLabel, FormControl, Input, Box, FormErrorMessage
} from '@chakra-ui/react'

import { IPropsFormAccessPortals } from './_IPropsForm'

export function FormLogin(props: IPropsFormAccessPortals): JSX.Element {
    const { errors, values, handleChange, handleBlur } = props
    return (
        <FormControl display={'flex'} flexDirection={'row'} isInvalid={!!errors.login} mt={2}>
            <FormLabel fontSize={'xs'} fontWeight={500} mb={0} mt={2} width={'100px'}>Login:</FormLabel>
            <Box>
                <Input fontSize={'xs'} fontWeight={400} width={'150px'} px={1}
                    id='login'
                    value={values.login}
                    onChange={handleChange}
                    onBlur={handleBlur}
                ></Input>
                <FormErrorMessage fontSize={'fs'} fontWeight={400} width={'150px'}>{errors.login}</FormErrorMessage>
            </Box>
        </FormControl>
    )
}