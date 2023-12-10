import Image from 'next/image'
import Link from 'next/link'

import { Box, Flex, Avatar, HStack, Button, Menu, MenuButton, BoxProps, MenuList, MenuItem } from '@chakra-ui/react'
import { useAuth } from '@context/AuthContext'

import { ButtonMenuHeader } from '../_ButtonMenuHeader'

export function Header(props: BoxProps): JSX.Element {
    const { user, signOut } = useAuth()

    return (
        <Box as="header" {...props} bg={'indigo.7'} px={4} zIndex={100}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'} >
                <HStack spacing={10} alignItems={'center'}>
                    <Link href="/Dashboard" as={'/Dashboard'} passHref={true}>
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
                                    hrefLink: '/CentroCusto',
                                    asLink: '/CentroCusto'
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
                            <Avatar name={user?.nameUser} bg={'indigo.9'} />
                        </MenuButton>

                        <MenuList bgColor={'indigo.7'} zIndex={'dropdown'} position={'relative'} minW='100px' maxW='100px'>
                            <MenuItem
                                color={'indigo.12'}
                                borderColor={'indigo.9'}
                                background={'indigo.7'}
                                _hover={{ backgroundColor: 'indigo.8' }}
                                _focus={{ backgroundColor: 'indigo.8' }}
                                onClick={signOut}
                            >Sair</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </Box>
    )
}