import { BoxProps, chakra, Flex, Text } from '@chakra-ui/react'

export function Footer(props: BoxProps): JSX.Element {
    return (
        <Flex as={'footer'} {...props} bgColor={'indigo.6'} justifyContent={'flex-end'} pr={10} zIndex={1000}>
            <Text fontSize={'xs'} color={'indigo.12'}>
                Desenvolvido com <chakra.span role="img" aria-label="heart">❤️</chakra.span> por <strong><i>CCB Dev</i></strong>
            </Text>
        </Flex>
    )
}