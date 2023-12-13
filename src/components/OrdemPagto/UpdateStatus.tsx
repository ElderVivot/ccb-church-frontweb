import { AxiosResponse } from 'axios'
import { Formik } from 'formik'
import { PropsWithChildren, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Row } from 'react-table'

import { putOrdemPagto } from '@api/OrdemPagto'
import { IOrdemPagto } from '@api/OrdemPagto/IOrdemPagto'
import {
    Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure,
    CircularProgress, CircularProgressLabel
} from '@chakra-ui/react'
import { useAuth } from '@context/AuthContext'

import { FormStatus } from './_Components/FormStatus'

interface IProps extends PropsWithChildren<object> {
    selectedFlatRows: Row<IOrdemPagto>[],
    pageNumber: number
    filtersExecuteFetch: any
}

export function UpdateStatusOrdemPagto(props: IProps): JSX.Element {
    const { user } = useAuth()
    const queryClient = useQueryClient()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenLoading, onOpen: onOpenLoading, onClose: onCloseLoading } = useDisclosure()
    const [percent, setPercent] = useState(0)
    const [status, setStatus] = useState<string>('')

    const { selectedFlatRows, pageNumber, filtersExecuteFetch } = props

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
            {user.permissions.indexOf('ordem_pagto=status_update') >= 0 || user.permissions.indexOf('ordem_pagto=create') >= 0
                ? <Button onClick={onOpen} size='xs' bg={'teal.10'} textColor={'white'} _hover={{ backgroundColor: 'teal.11' }}>Atualizar Status</Button>
                : null}
            {/* modal of loading */}
            <Modal closeOnOverlayClick={false} isOpen={isOpenLoading} onClose={onCloseLoading}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <CircularProgress value={percent} size='200px'>
                            <CircularProgressLabel>{percent.toFixed(2)}%</CircularProgressLabel>
                        </CircularProgress>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* modal of edit */}
            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
                size={'xl'}
            >
                <Formik
                    enableReinitialize={true}
                    initialValues={{}}
                    validationSchema={null}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true)
                        onClose()

                        onOpenLoading()

                        let counter = 0
                        for (const selectedFlatRow of selectedFlatRows) {
                            await updateOrdemPagto({
                                ...selectedFlatRow.original,
                                status,
                                schedulingDate: selectedFlatRow.original.schedulingDate.substring(0, 10)
                            })
                            counter += 1
                            setPercent(counter / selectedFlatRows.length * 100)
                        }

                        onCloseLoading()

                        setSubmitting(false)
                    }}
                >
                    {({ handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                            <ModalOverlay />

                            <ModalContent bg={'gray.100'}>

                                <ModalHeader />
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <FormStatus status={status} setStatus={setStatus} />
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