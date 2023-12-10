import { Formik } from 'formik'
import { useState } from 'react'
import { FaUserAlt, FaLock } from 'react-icons/fa'

import { Flex, Heading, Input, Button, InputGroup, Stack, InputLeftElement, chakra, Box, Avatar, FormControl, InputRightElement, FormErrorMessage, Text } from '@chakra-ui/react'
import { useAuth } from '@context/AuthContext'

import { validationSchemaLogin } from './_validation_schema'

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

export default function LoginPage(): JSX.Element {
    const [showPassword, setShowPassword] = useState(false)

    const { signIn, statusCodeLogin } = useAuth()

    const handleShowClick = () => setShowPassword(!showPassword)

    function MessageErrorLogin(): JSX.Element {
        if (statusCodeLogin === 404 || statusCodeLogin === 400 || statusCodeLogin === 401) {
            return <Text fontSize={'xs'} textAlign={'center'} color='red' fontWeight={600}>Usuário ou senha inválidos</Text>
        } else if (statusCodeLogin >= 500) {
            return <Text fontSize={'xs'} textAlign={'center'} color='red' fontWeight={600}>Erro ao tentar fazer login, tente novamente em alguns minutos</Text>
        }
        return <></>
    }

    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="indigo.3"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
                backgroundColor="indigo.4"
                rounded={4}
            >
                <Avatar bg="indigo.12" />
                <Heading color="indigo.12">Bem vindo</Heading>
                <Box minW={{ base: '90%', md: '468px' }}>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{ username: '', password: '' }}
                        validationSchema={validationSchemaLogin}
                        onSubmit={async (valuesForm, { setSubmitting }) => {
                            const { username, password } = valuesForm
                            try {
                                MessageErrorLogin()
                                await signIn({ username, password })
                            } catch (error) {
                                console.log(error)
                            }

                            setSubmitting(false)
                        }}
                    >
                        {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={4} p="1rem" boxShadow="md" >
                                    <FormControl>
                                        <InputGroup borderColor={'indigo.11'} >
                                            <InputLeftElement
                                                pointerEvents="none"
                                            >
                                                <CFaUserAlt color="indigo.12" />
                                            </InputLeftElement>
                                            <Input fontSize={'xs'} fontWeight={400}
                                                _hover={{ border: '1px solid #3451b2', rounded: 6 }}
                                                _focus={{ border: '1px solid #3451b2', rounded: 6 }}
                                                placeholder='Informe seu usuário'
                                                id='username'
                                                value={values.username}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            ></Input>
                                            <FormErrorMessage fontSize={'fs'} fontWeight={400}>{errors.username}</FormErrorMessage>
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl>
                                        <InputGroup borderColor={'indigo.11'}>
                                            <InputLeftElement
                                                pointerEvents="none"
                                            >
                                                <CFaLock color="indigo.12" />
                                            </InputLeftElement>
                                            <Input fontSize={'xs'} fontWeight={400}
                                                _hover={{ border: '1px solid #3451b2', rounded: 6 }}
                                                _focus={{ border: '1px solid #3451b2', rounded: 6 }}
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder='Informe sua senha'
                                                id='password'
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            ></Input>
                                            <FormErrorMessage fontSize={'fs'} fontWeight={400}>{errors.password}</FormErrorMessage>
                                            <InputRightElement mr={1} width="4.5rem">
                                                <Button h="1.75rem" size="xs" onClick={handleShowClick} color={'white'} bgColor={'indigo.12'} _hover={{ backgroundColor: 'indigo.900' }}>
                                                    {showPassword ? 'Esconder' : 'Mostrar'}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                        {/* <FormHelperText textAlign="right">
                                            <Link>Esqueceu a senha?</Link>
                                        </FormHelperText> */}
                                    </FormControl>
                                    <MessageErrorLogin />
                                    <Button borderRadius={2} type="submit" variant="solid" bgColor={'indigo.12'} isDisabled={isSubmitting}
                                        _hover={{ backgroundColor: 'indigo.900' }} color={'gray.100'} width="full">Entrar</Button>
                                </Stack>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Stack>
        </Flex>
    )
}