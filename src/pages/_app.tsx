/* eslint-disable indent */
import '../styles/global.css'
import { AppProps } from 'next/app'
import React from 'react'
import { QueryClientProvider } from 'react-query'

import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider, ProtectRoute } from '@context/AuthContext'
import { queryClient } from '@services/queryClient'

import { customTheme } from '../styles/theme'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <ProtectRoute>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </ProtectRoute>
      </AuthProvider>
    </ChakraProvider>
  )
}