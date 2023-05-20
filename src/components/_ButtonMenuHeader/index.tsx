import Link from 'next/link'

import { ChevronDownIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, Button, MenuList, MenuItem, MenuButtonProps } from '@chakra-ui/react'

interface IItemsMenu {
    name: string
    hrefLink: string
    asLink: string
}

interface IProps extends MenuButtonProps {
    nameButton: string
    itemsMenu: IItemsMenu[]
}

export function ButtonMenuHeader(props: IProps): JSX.Element {
    const { nameButton, itemsMenu } = props
    return (
        <Menu >
            <MenuButton
                bgColor={'indigo.6'}
                _hover={{ backgroundColor: 'indigo.8' }}
                _expanded={{ backgroundColor: 'indigo.6' }}
                border={'1px'}
                borderColor={'indigo.9'}
                color={'indigo.12'}
                as={Button}
                cursor={'pointer'}
                rightIcon={<ChevronDownIcon />}
            >
                {nameButton}
            </MenuButton>
            <MenuList bgColor={'indigo.6'} zIndex={'dropdown'} position={'relative'}>
                {itemsMenu.map((obj, key) => (
                    <MenuItem
                        key={key}
                        color={'indigo.12'}
                        borderColor={'indigo.9'}
                        background={'indigo.6'}
                        _hover={{ backgroundColor: 'indigo.8' }}
                        _focus={{ backgroundColor: 'indigo.8' }}
                        zIndex={1000}
                    >
                        <Link href={obj.hrefLink} as={obj.asLink}>{obj.name}</Link>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    )
}