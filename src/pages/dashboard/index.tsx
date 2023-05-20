import { useRouter } from 'next/router'

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { Heading } from '@chakra-ui/react'
import { LayoutDefault } from '@components/_LayoutDefault'

export default withPageAuthRequired(function Index({ user }) {
    const router = useRouter()
    if (!user) {
        router.push('/')
    }

    return (
        <>
            <LayoutDefault title='CCB - Dashboard'>
                <Heading m={5} as='h3' size='md'>CCB Controle Administrativo - Navegue pelos Menus pra ir pra opção Desejada</Heading>
            </LayoutDefault>
        </>
    )
})