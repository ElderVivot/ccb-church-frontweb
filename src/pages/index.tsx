import Image from 'next/image'
import { useRouter } from 'next/router'

import { useUser } from '@auth0/nextjs-auth0/client'
import { Button, Flex, Stack } from '@chakra-ui/react'

export default function Main(): JSX.Element {
    const router = useRouter()

    function handleSignIn() {
        router.push('/api/auth/login')
    }

    const { user, error, isLoading } = useUser()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    if (user) {
        router.push('/dashboard')
    }

    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="indigo.3"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
                backgroundColor="indigo.5"
                rounded={4}
            >
                <Flex minW={{ base: '90%', md: '400px' }} minH={{ base: '90%', md: '200px' }}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center">
                    <form>
                        <Flex
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            gap={6}
                        >
                            <div>
                                <Image src="/logo.png" alt="logo-ccb-light" width={200} height={200} />
                            </div>
                            <Button
                                h="1.75rem" size={'lg'} fontSize={'sm'}
                                color={'white'} bgColor={'indigo.10'} _hover={{ backgroundColor: 'indigo.11' }}
                                onClick={handleSignIn}
                            >Entrar
                            </Button>
                        </Flex>
                    </form>
                </Flex>
            </Stack>
        </Flex>
    )
}