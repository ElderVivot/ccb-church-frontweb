import {
    FormLabel, FormControl, Input, Box, FormErrorMessage
} from '@chakra-ui/react'

import { IPropsFormAccessPortals } from './_IPropsForm'

export function FormNameAccess(props: IPropsFormAccessPortals): JSX.Element {
    const { errors, values, handleChange, handleBlur } = props
    return (
        <FormControl display={'flex'} flexDirection={'row'} isInvalid={!!errors.nameAccess} mt={2}>
            <FormLabel fontSize={'xs'} fontWeight={500} mb={0} mt={2} width={'100px'}>Nome Acesso:</FormLabel>
            <Box>
                <Input fontSize={'xs'} fontWeight={400} width={'350px'} px={1}
                    id='nameAccess'
                    value={values.nameAccess}
                    onChange={handleChange}
                    onBlur={handleBlur}
                ></Input>
                <FormErrorMessage fontSize={'fs'} fontWeight={400} width={'350px'}>{errors.nameAccess}</FormErrorMessage>
            </Box>
        </FormControl>
    )
}