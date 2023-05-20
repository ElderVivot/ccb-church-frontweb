import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useUser } from '@auth0/nextjs-auth0/client'
import { Box, Flex, Avatar, HStack, Button, Menu, MenuButton, BoxProps, MenuList, MenuItem } from '@chakra-ui/react'

import { ButtonMenuHeader } from '../_ButtonMenuHeader'

export function Header(props: BoxProps): JSX.Element {
    const router = useRouter()
    const { user } = useUser()

    return (
        <Box as="header" {...props} bg={'indigo.6'} px={4} zIndex={100}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'} >
                <HStack spacing={10} alignItems={'center'}>
                    <Link href="/dashboard" as={'/dashboard'} passHref={true}>
                        <Image height={110} width={110} src="/logo.png" alt='Logo' />
                    </Link>
                    <HStack
                        as={'nav'}
                        spacing={4}
                        display={{ base: 'none', md: 'flex' }}
                    >
                        <ButtonMenuHeader nameButton='Cadastros'
                            itemsMenu={[
                                {
                                    name: 'Centro de Custo',
                                    hrefLink: '/CCCusto',
                                    asLink: '/CCCusto'
                                }
                            ]}
                        />
                        <ButtonMenuHeader nameButton='Processos'
                            itemsMenu={[
                                {
                                    name: 'Ordem de Pagto',
                                    hrefLink: '/OrdemPagto',
                                    asLink: '/OrdemPagto'
                                }
                            ]}
                        />
                    </HStack>
                </HStack>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            as={Button}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                        >
                            <Avatar name={user?.name} bg={'indigo.8'} />
                        </MenuButton>

                        <MenuList bgColor={'indigo.6'} zIndex={'dropdown'} position={'relative'} minW='100px' maxW='100px'>
                            <MenuItem
                                color={'indigo.12'}
                                borderColor={'indigo.9'}
                                background={'indigo.6'}
                                _hover={{ backgroundColor: 'indigo.8' }}
                                _focus={{ backgroundColor: 'indigo.8' }}
                                onClick={() => router.push('/api/auth/logout')}
                            >Sair</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </Box>
    )
}