import LinkNext from 'next/link'
import { useRouter } from 'next/router'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'

import { getDataUserPerAccessToken, signInRequest } from '@api/Auth'
import { IUser } from '@api/Auth/interfaces'
import { Link, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { LayoutDefault } from '@components/_LayoutDefault'
import { LayoutPublic } from '@components/_LayoutPublic'
import { api } from '@services/api'

export interface IAuthContext {
    isAuthenticated: boolean
    user: IUser
    statusCodeLogin: number
    loading: boolean
    signIn: (data: { username: string, password: string }) => Promise<void>
    signOut: () => void
}

export const AuthContext = createContext({} as IAuthContext)

export function AuthProvider({ children }: PropsWithChildren<object>): JSX.Element {
    const router = useRouter()
    const [user, setUser] = useState<IUser | null>(null)
    const [statusCodeLogin, setStatusCodeLogin] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const { 'ccbchurch.token': token } = parseCookies()

        if (token) {
            getDataUserPerAccessToken(token).then(
                response => {
                    setUser(response.user)
                }
            )
        }
        setLoading(false)
    }, [])

    async function signIn({ username, password }: { username: string, password: string }) {
        const signInDataRequest = await signInRequest(username, password)
        setUser(signInDataRequest.user)
        setStatusCodeLogin(signInDataRequest.status)

        setCookie(undefined, 'ccbchurch.token', signInDataRequest.accessToken, {
            maxAge: 60 * 60 * 2, // 2 hour
            path: '/'
        })
        if (signInDataRequest && signInDataRequest.user) {
            router.push('/Dashboard')
        }
        setLoading(false)
    }

    const signOut = () => {
        destroyCookie(undefined, 'ccbchurch.token', { path: '/' })
        setUser(null)
        setStatusCodeLogin(0)
        delete api.defaults.headers.common.Authorization
        router.push('/')
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signOut, loading, statusCodeLogin }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): IAuthContext => useContext<IAuthContext>(AuthContext)

export const ProtectRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth()
    const router = useRouter()

    if (loading && router.pathname !== '/login' && router.pathname !== '/' && router.pathname.indexOf('_public') < 0) {
        return (
            <LayoutDefault title='CCB - Carregando'>
                <Heading ml={2} as='h3' size='md'>Carregando...</Heading>
            </LayoutDefault>
        )
    }

    if (!loading && !isAuthenticated && router.isReady && router.pathname !== '/login' && router.pathname !== '/' && router.pathname.indexOf('_public') < 0) {
        return (
            <LayoutPublic title='CCB - Sem Acesso' >
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
                        justifyContent="center"
                        alignItems="center"
                        rounded={4}
                    >
                        <Text fontWeight={500} m={5}>
                            Você não possui acesso à essa página, faça o login <LinkNext href={'/login'}><Link fontWeight={600} fontStyle='italic'>clicando aqui</Link></LinkNext>
                        </Text>
                    </Stack>
                </Flex>
            </LayoutPublic>
        )
    }
    return children
}