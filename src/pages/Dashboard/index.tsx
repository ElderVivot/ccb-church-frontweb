import { Heading } from '@chakra-ui/react'
import { LayoutDefault } from '@components/_LayoutDefault'

export default function Dashboard(): JSX.Element {
    return (
        <>
            <LayoutDefault title='CCB - Dashboard'>
                <Heading m={5} as='h3' size='md'>CCB Controle Administrativo - Navegue pelos Menus pra ir pra opção Desejada</Heading>
            </LayoutDefault>
        </>
    )
}