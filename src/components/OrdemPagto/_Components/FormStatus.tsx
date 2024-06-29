import {
    FormLabel, FormControl, Select, Box
} from '@chakra-ui/react'

export function FormStatus({ status, setStatus }): JSX.Element {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const eventValue = event.target.value
        setStatus(eventValue)
    }

    return (
        <FormControl display={'flex'} flexDirection={'row'}>
            <FormLabel alignSelf={'center'} fontSize={'xs'} fontWeight={500} mb={0} width={'100px'}>Novo Status</FormLabel>
            <Box>
                <Select h={'2.3rem'} fontSize={'xs'} fontWeight={400} width={'200px'}
                    id={'status'}
                    value={status}
                    onChange={handleChange}
                >
                    <option value={'OPENED'}>Em Aberto</option>
                    <option value={'PAYED'}>Pago - Etapa 1</option>
                    <option value={'PAYED_2'}>Pago - Etapa 2</option>
                    <option value={'LAUNCHED_SYSTEM'}>Lançado no SIGA</option>
                    <option value={'CANCELED'}>Cancelado</option>
                </Select>
            </Box>
        </FormControl>
    )
}