import {
    FormLabel, FormControl, Input, Box, FormErrorMessage
} from '@chakra-ui/react'

import { IPropsFormOrdemPagto } from './_IPropsForm'

export function FormNumberNote(props: IPropsFormOrdemPagto): JSX.Element {
    const { errors, values, handleChange, handleBlur } = props
    return (
        <FormControl display={'flex'} flexDirection={'row'} isInvalid={!!errors.numberNote} >
            <FormLabel fontStyle={'italic'} alignSelf={'center'} fontSize={'xs'} fontWeight={500} mb={0} width={'100px'}>Núm. Nota:</FormLabel>
            <Box>
                <Input fontSize={'xs'} fontWeight={400} width={'150px'} px={1}
                    id='numberNote'
                    value={values.numberNote}
                    onChange={handleChange}
                    onBlur={handleBlur}
                ></Input>
                <FormErrorMessage fontSize={'fs'} fontWeight={400} width={'150px'}>{errors.numberNote}</FormErrorMessage>
            </Box>
        </FormControl>
    )
}