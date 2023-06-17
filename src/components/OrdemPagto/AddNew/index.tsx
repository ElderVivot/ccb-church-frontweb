import { Formik } from 'formik'
import { PropsWithChildren } from 'react'

import { postAccessPortals } from '@api/tenant/AccessPortals'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react'

import { FormLogin } from '../_Components/FormLogin'
import { FormNameAccess } from '../_Components/FormNameAccess'
import { FormPassword } from '../_Components/FormPassword'
import { FormStatus } from '../_Components/FormStatus'
import { FormTypeAccessPortals } from '../_Components/FormTypeAccessPortals'
import { validationSchemaAccessPortals } from '../_validation_schema'
import { initialValuesAccessPortalsAddNew } from './_initial_values'

interface IProps extends PropsWithChildren<object> {
    tenant: string
}

export function AddNewAccessPortals(props: IProps): JSX.Element {
    const { tenant } = props

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen} size='xs' colorScheme={'blue'}>Adicionar</Button>

            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
                size={'xl'}
            >
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValuesAccessPortalsAddNew}
                    validationSchema={validationSchemaAccessPortals}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            setSubmitting(true)
                            await postAccessPortals(values, tenant)
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