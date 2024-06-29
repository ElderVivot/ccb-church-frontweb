import { useState } from 'react'

import { Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption, MenuButtonProps } from '@chakra-ui/react'

export type MultiSelectMenuProps = {
    options: string[]
    onChange?: (event: string[]) => void
    buttonProps?: MenuButtonProps
    situationAlreadySelected?: string[]
}

export const MultiSelectMenu = (props: MultiSelectMenuProps): JSX.Element => {
    const { options, buttonProps, situationAlreadySelected, onChange } = props
    const [selectedOptions, setSelectedOptions] = useState<string[]>(situationAlreadySelected ? [...situationAlreadySelected] : [])
    return (
        <Menu closeOnSelect={false}>
            {({ onClose }) => (
                <>
                    <MenuButton
                        px={2}
                        textAlign={'left'}
                        type="button"
                        borderColor={'gray.200'}
                        borderWidth={1}
                        borderRadius="5px"
                        _focus={{
                            outline: 'none'
                        }}
                        {...buttonProps}
                    >
                        {`${selectedOptions && selectedOptions.length > 0 && selectedOptions[0] ? `${selectedOptions[0]} ...` : 'Clique pra selecionar'}`}
                    </MenuButton>
                    <MenuList zIndex={100}>
                        <MenuItemOption
                            pl={0}
                            _hover={{ bgColor: 'blue.300' }}
                            fontSize={'xs'}
                            onClick={() => {
                                setSelectedOptions(options)
                                onChange?.(options)
                                onClose()
                            }}
                        >Todos</MenuItemOption>
                        <MenuItemOption
                            pl={0}
                            _hover={{ bgColor: 'blue.300' }}
                            fontSize={'xs'}
                            onClick={() => {
                                setSelectedOptions([])
                                props.onChange?.([])
                                onClose()
                            }}
                        >Limpar Todos</MenuItemOption>

                        <MenuOptionGroup
                            title={undefined}
                            value={selectedOptions}
                            defaultValue={selectedOptions}
                            type="checkbox"
                            onChange={(values: string[]) => {
                                setSelectedOptions(values.filter((_) => _.length))
                                props.onChange?.(values)
                            }}
                        >
                            {options.map((option, key) => {
                                return (
                                    <MenuItemOption
                                        _hover={{ bgColor: 'blue.300' }}
                                        pl={0}
                                        fontSize={'xs'}
                                        key={`multiselect-menu-${key}`}
                                        /* eslint-disable @typescript-eslint/ban-ts-comment */
                                        // @ts-ignore <MenuItemOption> does have a 'type' prop because it is just a button. This is to make sure clicking this doesn't submit any forms.
                                        type="button"
                                        value={option}
                                    >
                                        {option}
                                    </MenuItemOption>
                                )
                            })}
                        </MenuOptionGroup>
                    </MenuList>
                </>
            )}
        </Menu>
    )
}

MultiSelectMenu.displayName = 'MultiSelectMenu'