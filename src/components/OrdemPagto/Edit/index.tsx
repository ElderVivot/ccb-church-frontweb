import axios, { AxiosResponse } from 'axios'
import { Formik } from 'formik'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { useMutation, useQueryClient } from 'react-query'

import { putOrdemPagto } from '@api/OrdemPagto'
import { IOrdemPagto } from '@api/OrdemPagto/IOrdemPagto'
import { Button, Modal, ModalOverlay, ModalContent, FormErrorMessage, ModalHeader, Input, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, FormControl, FormLabel, Box, Tooltip } from '@chakra-ui/react'
import { LoadingWithoutPercent } from '@components/_Loading'
import { useAuth } from '@context/AuthContext'

import { FormAdditionalDescription } from '../_Components/FormAdditionalDescription'
import { FormAmount } from '../_Components/FormAmount'
import { FormDataToPayment } from '../_Components/FormDataToPayment'
import { FormIdCentroCusto } from '../_Components/FormIdCentroCusto'
import { FormIdPaymentObjective } from '../_Components/FormIdPaymentObjective'
import { FormNameProvider } from '../_Components/FormNameProvider'
import { FormNumberNote } from '../_Components/FormNumberNote'
import { FormNumberOrder } from '../_Components/FormNumberOrder'
import { FormSchedulingDate } from '../_Components/FormSchedulingDate'
import { FormPayment } from '../_Components/FormTypePayment'
import { validationSchemaOrdemPagto } from '../_validation_schema'

interface IProps {
    rowData: IOrdemPagto
    pageNumber: number
    filtersExecuteFetch: any
    centroCusto: { value: string, label: string }[]
    paymentObjective: { value: string, label: string }[]
}

async function uploadDocument(fileSave: File) {
    try {
        const nameFile = fileSave.name.split('.')
        const extension = nameFile[nameFile.length - 1].toLowerCase()
        const { data: dataUploadBoleto } = await axios.post('/api/upload_file_generic', {
            extension
        })

        let contentType = 'multipart/form-data'
        if (extension === 'pdf') contentType = 'application/pdf'
        else if (extension === 'png' || extension === 'jpg' || extension === 'jpeg') contentType = 'image/png'

        await axios.put(dataUploadBoleto.url, fileSave, {
            headers: {
                'Content-type': contentType
            },
            onUploadProgress: (progressEvent) => {
                const progress: number = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                )
            }
        })
        return dataUploadBoleto.url.split('?')[0]
    } catch (error) {
        console.log(error)
        return ''
    }
}

export function EditOrdemPagto(props: IProps): JSX.Element {
    const { user } = useAuth()
    const queryClient = useQueryClient()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [fileBoleto, setFileBoleto] = useState<File>()
    const [fileNF, setFileNF] = useState<File>()
    const [fileOrder, setFileOrder] = useState<File>()
    const [filePaymentProof, setFilePaymentProof] = useState<File>()
    const { isOpen: isOpenWithoutPercent, onOpen: onOpenWithoutPercent, onClose: onCloseWithoutPercent } = useDisclosure()

    const { rowData: ordemPagto, pageNumber, filtersExecuteFetch, centroCusto, paymentObjective } = props

    const { mutateAsync: updateOrdemPagto } = useMutation(async (data: IOrdemPagto) => {
        return await putOrdemPagto(data)
    }, {
        onSuccess: ({ data: newData }) => {
            queryClient.setQueryData(['ordem_pagto', pageNumber, filtersExecuteFetch], (oldData: AxiosResponse<IOrdemPagto[], any>): AxiosResponse<IOrdemPagto[], any> => {
                const dataToReturn = { ...oldData }
                dataToReturn.data = oldData.data.map((old) => {
                    if (old.idOrdemPagto === newData.idOrdemPagto) {
                        return { ...old, ...newData }
                    } else {
                        return { ...old }
                    }
                })
                return dataToReturn
            })
        }
    })

    return (
        <>
            <LoadingWithoutPercent isOpenWithoutPercent={isOpenWithoutPercent} onCloseWithoutPercent={onCloseWithoutPercent} />

            {user.permissions.indexOf('ordem_pagto=create') >= 0

                ? <Tooltip label='Editar Ordem Pagto' ><Button onClick={onOpen} bg={'transparent'} m={0} p={0} border={0} size='sm' iconSpacing={0} leftIcon={<FaEdit />}></Button></Tooltip>
                : null}
            <Modal
                closeOnEsc={false}
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
                size={'2xl'}
            >
                <Formik
                    enableReinitialize={true}
                    initialValues={
                        {
                            ...ordemPagto,
                            urlOrder: ordemPagto.urlOrder || '',
                            urlBoleto: ordemPagto.urlBoleto || '',
                            urlDataToPayment: ordemPagto.urlDataToPayment || '',
                            urlNF: ordemPagto.urlNF || '',
                            urlPaymentProof: ordemPagto.urlPaymentProof || ''
                        }
                    }
                    validationSchema={validationSchemaOrdemPagto}
                    onSubmit={async (values, { setSubmitting }) => {
                        values.OrdemPagtoCCustos = []
                        try {
                            setSubmitting(true)
                            onOpenWithoutPercent()

                            if (fileBoleto) values.urlBoleto = await uploadDocument(fileBoleto)
                            if (fileNF) values.urlNF = await uploadDocument(fileNF)
                            if (fileOrder) values.urlOrder = await uploadDocument(fileOrder)
                            if (filePaymentProof) values.urlPaymentProof = await uploadDocument(filePaymentProof)

                            values.OrdemPagtoCCustos.push({
                                idCentroCusto: values.idCentroCusto,
                                amount: values.amountOrdemPagto.toFixed(2).toString()
                            })

                            await updateOrdemPagto(values)
                            await queryClient.invalidateQueries(['ordem_pagto', pageNumber, filtersExecuteFetch])
                            setSubmitting(false)
                            onCloseWithoutPercent()
                            onClose()
                        } catch (error) {
                            console.log(error)
                        }
                    }}
                >
                    {({ values, errors, handleChange, handleBlur, setFieldValue, setFieldTouched, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                            <ModalOverlay />

                            <ModalContent bg={'indigo.1'}>

                                <ModalHeader />
                                <ModalCloseButton />
                                <ModalBody pb={6} gap={1} display={'flex'} flexDirection={'column'}>
                                    <FormSchedulingDate errors={errors} values={values} handleChange={handleChange} setFieldTouched={setFieldTouched} handleBlur={handleBlur} />
                                    <FormIdCentroCusto selectOptions={centroCusto} errors={errors} values={values} handleChange={handleChange} setFieldTouched={setFieldTouched} handleBlur={handleBlur} />
                                    <Box display={'flex'}>
                                        <FormAmount errors={errors} values={values} handleChange={handleChange} setFieldTouched={setFieldTouched} handleBlur={handleBlur} />
                                        <FormPayment errors={errors} values={values} handleChange={handleChange} setFieldTouched={setFieldTouched} handleBlur={handleBlur} />
                                    </Box>
                                    <FormIdPaymentObjective selectOptions={paymentObjective} errors={errors} values={values} handleChange={handleChange} setFieldTouched={setFieldTouched} handleBlur={handleBlur} />
                                    <FormNameProvider errors={errors} values={values} handleChange={handleChange} setFieldTouched={setFieldTouched} handleBlur={handleBlur} />
                                    <Box display={'flex'}>
                                        <FormNumberNote errors={errors} values={values} handleChange={handleChange} setFieldTouched={setFieldTouched} handleBlur={handleBlur} />
                                        <FormNumberOrder errors={errors} values={values} handleChange={handleChange} setFieldTouched={setFieldTouched} handleBlur={handleBlur} />
                                    </Box>
                                    <FormDataToPayment errors={errors} values={values} handleChange={handleChange} setFieldTouched={setFieldTouched} handleBlur={handleBlur} />
                                    <FormAdditionalDescription errors={errors} values={values} handleChange={handleChange} setFieldTouched={setFieldTouched} handleBlur={handleBlur} />

                                    <FormControl display={'flex'} flexDirection={'row'} >
                                        <FormLabel mb={0} alignSelf={'center'} fontSize={'xs'} w={'100px'} fontWeight={500}>Arquivo Boleto:</FormLabel>
                                        <Box >
                                            <Input width={'500px'}
                                                id='urlBoleto'
                                                onChange={e => {
                                                    const dataFile = e.currentTarget.files[0]
                                                    setFieldValue('urlBoleto', dataFile?.name || '')
                                                    setFileBoleto(dataFile)
                                                }}
                                                onBlur={handleBlur}
                                                type={'file'}
                                                accept='.pdf,.png,.jpeg,.jpg'
                                                fontSize={'xs'}
                                            />
                                            <FormErrorMessage fontSize={'fs'} fontWeight={400}>Selecione o arquivo</FormErrorMessage>
                                        </Box>
                                    </FormControl>

                                    <FormControl display={'flex'} flexDirection={'row'} >
                                        <FormLabel mb={0} alignSelf={'center'} fontSize={'xs'} w={'100px'} fontWeight={500}>Arquivo Pedido:</FormLabel>
                                        <Box >
                                            <Input width={'500px'}
                                                id='urlOrder'
                                                onChange={e => {
                                                    const dataFile = e.currentTarget.files[0]
                                                    setFieldValue('urlOrder', dataFile?.name || '')
                                                    setFileOrder(dataFile)
                                                }}
                                                onBlur={handleBlur}
                                                type={'file'}
                                                accept='.pdf,.png,.jpeg,.jpg'
                                                fontSize={'xs'}
                                            />
                                        </Box>
                                    </FormControl>

                                    <FormControl display={'flex'} flexDirection={'row'} >
                                        <FormLabel alignSelf={'center'} fontSize={'xs'} w={'100px'} fontWeight={500}>Arquivo NF:</FormLabel>
                                        <Box >
                                            <Input width={'500px'}
                                                id='urlNF'
                                                onChange={e => {
                                                    const dataFile = e.currentTarget.files[0]
                                                    setFieldValue('urlNF', dataFile?.name)
                                                    setFileNF(dataFile)
                                                }}
                                                onBlur={handleBlur}
                                                type={'file'}
                                                accept='.pdf,.png,.jpeg,.jpg'
                                                fontSize={'xs'}
                                            />
                                        </Box>
                                    </FormControl>

                                    <FormControl display={'flex'} flexDirection={'row'} >
                                        <FormLabel alignSelf={'center'} fontSize={'xs'} w={'100px'} fontWeight={500}>Arquivo Comprovante Pagto:</FormLabel>
                                        <Box >
                                            <Input width={'500px'}
                                                id='urlPaymentProof'
                                                onChange={e => {
                                                    const dataFile = e.currentTarget.files[0]
                                                    setFieldValue('urlPaymentProof', dataFile?.name)
                                                    setFilePaymentProof(dataFile)
                                                }}
                                                onBlur={handleBlur}
                                                type={'file'}
                                                accept='.pdf,.png,.jpeg,.jpg'
                                                fontSize={'xs'}
                                            />
                                        </Box>
                                    </FormControl>
                                </ModalBody>

                                <ModalFooter>
                                    <Button size={'sm'} colorScheme='green' mr={3} isDisabled={isSubmitting} type='submit'>Salvar</Button>
                                    <Button size={'sm'} colorScheme='orange' onClick={onClose}>Cancelar</Button>
                                </ModalFooter>
                                {/* <Box>
                                    <pre style={{ fontSize: '9px' }}>{JSON.stringify(values, null, 2)}</pre>
                                    <pre style={{ fontSize: '9px' }}>{JSON.stringify(errors, null, 2)}</pre>
                                </Box> */}
                            </ModalContent>
                        </form>
                    )}
                </Formik>
            </Modal>
        </>
    )
}