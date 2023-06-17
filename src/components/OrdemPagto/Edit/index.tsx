import { AxiosResponse } from 'axios'
import { Formik } from 'formik'
import { PropsWithChildren } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { putAccessPortals } from '@api/tenant/AccessPortals'
import { IAccessPortals } from '@api/tenant/AccessPortals/IAccessPortals'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react'
import { IconEdit } from '@components/_Icons/edit'

import { FormLogin } from '../_Components/FormLogin'
import { FormNameAccess } from '../_Components/FormNameAccess'
import { FormPassword } from '../_Components/FormPassword'
import { FormStatus } from '../_Components/FormStatus'
import { FormTypeAccessPortals } from '../_Components/FormTypeAccessPortals'
import { IFilters } from '../_interfaces'
import { validationSchemaAccessPortals } from '../_validation_schema'

interface IProps extends PropsWithChildren<object> {
    rowData: IAccessPortals,
    tenant: string
    pageNumber: number
    filtersExecuteFetch: IFilters
}

export function EditCompanieRoutine(props: IProps): JSX.Element {
    const queryClient = useQueryClient()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { rowData: accessPortals, tenant, pageNumber, filtersExecuteFetch } = props

    const { mutateAsync: updateCompanieRoutine } = useMutation(async (data: IAccessPortals) => {
        return await putAccessPortals(data, tenant)
    }, {
        onSuccess: ({ data: newData }) => {
            console.log(newData)
            queryClient.setQueryData(['access_portals', pageNumber, filtersExecuteFetch], (oldData: AxiosResponse<IAccessPortals[], any>): AxiosResponse<IAccessPortals[], any> => {
                const dataToReturn = { ...oldData }
                dataToReturn.data = oldData.data.map((old) => {
                    if (old.idAccessPortals === newData.idAccessPortals) {
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
            <Button onClick={onOpen} bg={'transparent'} m={0} p={0} border={0} size='sm' iconSpacing={0} leftIcon={<IconEdit />}></Button>

            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
                size={'xl'}
            >
                <Formik
                    enableReinitialize={true}
                    initialValues={
                        { ...accessPortals }
                    }
                    validationSchema={validationSchemaAccessPortals}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            setSubmitting(true)
                            await updateCompanieRoutine(values)
                            setSubmitting(false)
                            onClose()
                        } catch (error) {
                            console.log(error)
                        }
                    }}
                >
                    {({ values, errors, handleChange, handleBlur, setFieldTouched, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                            <ModalOverlay />

                            <ModalContent bg={'gray.100'}>

                                <ModalHeader />
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <FormTypeAccessPortals errors={errors} values={values} handleChange={handleChange} setFieldTouched={setFieldTouched} handleBlur={handleBlur} />
                                    <FormLogin errors={errors} values={values} handleChange={handleChange} setFieldTouched={setFieldTouched} handleBlur={handleBlur} />
                                    <FormNameAccess errors={errors} values={values} handleChange={handleChange} setFieldTouched={setFieldTouched} handleBlur={handleBlur} />
                                    <FormPassword errors={errors} values={values} handleChange={handleChange} setFieldTouched={setFieldTouched} handleBlur={handleBlur} />
                                    <FormStatus errors={errors} values={values} handleChange={handleChange} setFieldTouched={setFieldTouched} handleBlur={handleBlur} />
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