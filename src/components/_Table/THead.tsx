import { TableHeadProps, chakra, Flex, Box, Thead, Th, Tr } from '@chakra-ui/react'
import { THeaderGroup } from '@common/types/ReactTable'
import { faArrowCircleUp, faArrowCircleDown, faArrowsAltV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IProps extends TableHeadProps {
    headerGroups: THeaderGroup<object>[]
}

export function THeadComponent(props: IProps): JSX.Element {
    return (
        <Thead position={'sticky'} top={0} zIndex={1}>
            {props.headerGroups.map((headerGroup, key) => (
                <Tr key={key} bg={'indigo.4'} {...headerGroup.getHeaderGroupProps()} position={'sticky'} top={0}>
                    {headerGroup.headers.map((column, key) => (
                        <Th key={key} padding={0.3} fontSize={'fs'} textAlign={'center'} textTransform={'none'} h={'3.5rem'}
                            maxW={column.width} minW={column.width} w={column.width}
                            border={'1px solid #718096'} position={'sticky'} top={0}
                        >
                            <Flex h={'3.5rem'} direction={'column'}
                                justifyContent={column.disableFilters ? 'center' : 'flex-end'} alignItems={'center'}>
                                <Flex justifyContent={'center'} alignItems={'center'}>
                                    {column.render('Header')}
                                    {column.disableSortBy
                                        ? null
                                        : (
                                            <chakra.span ml={1} {...column.getHeaderProps(column.getSortByToggleProps())} title='Clique aqui pra ordenar'>
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? (<FontAwesomeIcon icon={faArrowCircleDown} size='sm' />)
                                                        : (<FontAwesomeIcon icon={faArrowCircleUp} size='sm' />)
                                                    : (<FontAwesomeIcon icon={faArrowsAltV} size='sm' />)}
                                            </chakra.span>
                                        )
                                    }
                                </Flex>
                                <Box w={'98%'} _hover={{ bg: 'indigo.5' }}>
                                    {column.disableFilters ? null : column.render('Filter')}
                                </Box>
                            </Flex>
                        </Th>
                    ))}
                </Tr>
            ))}
        </Thead>
    )
}