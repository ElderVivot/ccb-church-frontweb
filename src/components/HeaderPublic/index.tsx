import Image from 'next/image'
import Link from 'next/link'

import { Box, Flex, HStack, BoxProps } from '@chakra-ui/react'

export function HeaderPublic(props: BoxProps): JSX.Element {
    return (
        <Box as="header" {...props} bg={'indigo.6'} px={4} zIndex={100}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'} >
                <HStack spacing={10} alignItems={'center'}>
                    <Link href="/dashboard" as={'/dashboard'} passHref={true}>
                        <Image height={110} width={110} src="/logo.png" alt='Logo' />
                    </Link>
                </HStack>
            </Flex>
        </Box>
    )
}