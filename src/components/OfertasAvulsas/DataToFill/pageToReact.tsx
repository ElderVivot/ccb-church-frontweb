import { registerLanguageDictionary, ptBR } from 'handsontable/i18n'
import { registerAllModules } from 'handsontable/registry'
import { registerRenderer } from 'handsontable/renderers'
import React, { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import { fetchDataCentroCusto } from '@api/CentroCusto'
import { fetchDataOfertasAvulsasPerID, putOfertasAvulsasPerId } from '@api/OfertasAvulsas/DataToFill'
import { IOfertasAvulsasDataToFill, IOfertasAvulsas } from '@api/OfertasAvulsas/IOfertasAvulsasDataToFill'
import {
    Box, Button, ButtonGroup, Flex, Heading, Text, useToast
} from '@chakra-ui/react'
import { formatDate, generateArrayOfLines } from '@common/utils/functions'
import { HotTable } from '@handsontable/react'

import { SettingsColumns } from './SettingsColumns'

import 'handsontable/dist/handsontable.full.min.css'

registerAllModules()
registerLanguageDictionary(ptBR)

interface IProps extends PropsWithChildren<object> {
    id: string
}

export default function OfertasAvulsasPageReact(props: IProps): JSX.Element {
    const { id } = props
    const toast = useToast()
    const [existChange, setExistChange] = useState(false)
    const [dateLastUpdated, setDateLastUpdate] = useState(null)
    const [dataLanc, setDataLanc] = useState<IOfertasAvulsas[]>([])
    const [centroCustoList, setCentroCustoList] = useState<string[]>(null)
    const [centroCustoDePara, setCentroCustoDePara] = useState<object>({})

    const { data: response, isFetching, isSuccess } = useQuery(['ofertas_avulsas', id], async () => {
        const response = await fetchDataOfertasAvulsasPerID(id)
        return response
    }, {
        staleTime: 0,
        keepPreviousData: true,
        refetchOnWindowFocus: false
    })

    const dataFetch: IOfertasAvulsasDataToFill = useMemo(() => {
        console.log('oiiii')
        if (isSuccess) {
            setDataLanc(response?.data?.Item?.lancs || [])
            return response?.data
        } else return {}
    }, [response, isSuccess])

    const { data: responseCentroCusto, isFetching: isFetchingCentroCusto, isSuccess: isSuccessCentroCusto } = useQuery(['centro_custo'], async () => {
        const response = await fetchDataCentroCusto()
        return response
    }, {
        staleTime: 0,
        keepPreviousData: true,
        refetchOnWindowFocus: false
    })

    useMemo(() => {
        if (isSuccessCentroCusto) {
            setCentroCustoList(responseCentroCusto?.data?.map(el => el.nameCentroCusto + ' - ' + el.codeCentroCusto))
            const centroCusto = {}
            for (const el of responseCentroCusto?.data) {
                centroCusto[`${el.codeCentroCusto}`] = el.idCentroCusto
            }
            setCentroCustoDePara(centroCusto)
        }
    }, [responseCentroCusto, isSuccessCentroCusto])

    const handleSaveData = useCallback(async () => {
        dataFetch.Item.id = id
        dataFetch.Item.updatedAt = new Date().toISOString()
        dataFetch.Item.lancs = dataLanc
        await putOfertasAvulsasPerId(dataFetch.Item, centroCustoDePara)
        setDateLastUpdate(dataFetch.Item.updatedAt)
        setExistChange(false)
        toast({
            description: 'Salvo com sucesso',
            status: 'success',
            duration: 5000,
            isClosable: true
        })
    }, [dataFetch, toast, centroCustoDePara, id, dataLanc])

    const generateNewLines = async (qtdLines = 10) => {
        dataFetch.Item.updatedAt = new Date().toISOString()
        setDataLanc([...dataFetch.Item.lancs, ...generateArrayOfLines(qtdLines)])
        dataFetch.Item.lancs = dataLanc
    }

    useEffect(() => {
        const interval = setInterval(
            async () => {
                if (existChange) {
                    try {
                        await handleSaveData()
                    } catch (error) {
                        console.log('error save data automatic', error)
                    }
                }
            },
            1000 * 60 * 1 // 1 minute
        )
        return () => clearInterval(interval)
    }, [existChange, handleSaveData])

    registerRenderer('amountValue', (hotInstance, TD, row, col, prop, value, cellProperties) => {
        TD.style.color = '#1A202C'
        // TD.style.display = 'flex'
        TD.textContent = `${Number(value).toFixed(2)}`
        TD.style.fontWeight = 'bold'
        TD.className = 'htMiddle htCenter'

        TD.style.backgroundColor = '#68D391'
        if (!hotInstance.getDataAtCell(row, 5) && value > 0) {
            TD.style.backgroundColor = '#FEB2B2'
        }
        if (!value) TD.style.backgroundColor = 'white'
        if (!hotInstance.getDataAtCell(row, 5) && value >= 300) {
            TD.style.backgroundColor = '#F56565'
        }
    })

    registerRenderer('codeChurch', (hotInstance, TD, row, col, prop, value, cellProperties) => {
        let codeChurch = ''
        try {
            codeChurch = hotInstance.getDataAtCell(row, 5).split('-')
            codeChurch = codeChurch[codeChurch.length - 1].trim()
            if (codeChurch) codeChurch = `${codeChurch.substring(0, 2)}-${codeChurch.substring(2)}`
        } catch (error) { }
        TD.textContent = codeChurch
        TD.className = 'htMiddle htCenter'
        dataLanc[row].codeCentroCusto = codeChurch
        // console.log(row, hotInstance.getDataAtCell(row, 5), dataLanc[row].codeCentroCusto)
    })

    if (isFetching || !isSuccess || isFetchingCentroCusto) {
        return (
            <Heading ml={2} as='h3' size='md'>Carregando...</Heading>
        )
    }

    return (
        <>
            <Box >
                <Flex minWidth='max-content' alignItems={'center'} justifyContent={'space-between'} mr={2}>
                    <Text ml={4} my={2} fontSize={'lg'} textAlign={'center'} w={1175} fontWeight={600}>Lançamento de Ofertas Avulsas</Text>
                </Flex>
                <Flex ml={4} my={2} w={'98vw'} wrap={'wrap'} justifyContent={'space-between'} >
                    <Box>
                        <Text fontSize={'sm'} fontWeight={500}>
                            {formatDate(dataFetch?.Item.startPeriod, 'yyyy-MM-dd', 'dd/MM/yyyy')} a {formatDate(dataFetch?.Item.endPeriod, 'yyyy-MM-dd', 'dd/MM/yyyy')}
                        </Text>
                        <Text fontSize={'fs'} fontWeight={500}>
                            Dados salvos automaticamente a <u>cada 1 minuto quando há alteração</u>,
                            última atualização: <strong><u>{formatDate(dateLastUpdated || dataFetch?.Item.updatedAt, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", 'dd/MM/yyyy HH:mm:ss')}</u></strong>
                        </Text>
                    </Box>
                    <ButtonGroup>
                        <Button onClick={() => generateNewLines(10)} size='xs' colorScheme={'green'}>Gerar Novas Linhas</Button>
                        <Button onClick={handleSaveData} size='xs' colorScheme={'blue'}>Salvar Manual</Button>
                    </ButtonGroup>
                </Flex>
                <Box ml={4}>
                    <HotTable
                        settings={{
                            data: dataLanc,
                            language: 'pt-BR',
                            columns: SettingsColumns.map(el => {
                                if (el.data === 'nameCentroCusto') {
                                    return {
                                        data: 'nameCentroCusto',
                                        title: '<b>Centro de Custo</b>',
                                        type: 'dropdown',
                                        filter: true,
                                        width: 200,
                                        source: centroCustoList
                                    }
                                } else return el
                            }),
                            className: 'htCenter htMiddle',
                            height: '75vh',
                            width: '98vw',
                            afterChange: (changes, source) => {
                                if (source === 'edit' && changes) {
                                    setExistChange(true)
                                }
                            },

                            cells: function (_, col) {
                                const cellProperties: { renderer?: string } = {}
                                if (col === 1) {
                                    cellProperties.renderer = 'amountValue'
                                } else if (col === 6) {
                                    cellProperties.renderer = 'codeChurch'
                                }
                                return cellProperties
                            },
                            // hiddenColumns: {
                            //     columns: [6]
                            // },
                            rowHeaders: true,
                            columnSorting: true,
                            // autoWrapRow: true,
                            filters: true,
                            dropdownMenu: true,
                            contextMenu: true,
                            // manualColumnMove: true,
                            manualColumnResize: true,
                            manualColumnFreeze: true,
                            allowInsertRow: true,
                            allowRemoveRow: true,
                            licenseKey: 'non-commercial-and-evaluation'
                        }}

                    />
                </Box>
                {/* <Box>
                    <pre style={{ fontSize: '9px' }}>{JSON.stringify(dataFetch?.Item?.lancs, null, 2)}</pre>
                </Box> */}
            </Box>
        </>
    )
}