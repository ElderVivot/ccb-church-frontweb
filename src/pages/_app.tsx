/* eslint-disable indent */
import { AppProps } from 'next/app'
import React from 'react'
import { QueryClientProvider } from 'react-query'

import { UserProvider } from '@auth0/nextjs-auth0/client'
import { ChakraProvider } from '@chakra-ui/react'
import { queryClient } from '@services/queryClient'

import { customTheme } from '../styles/theme'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={customTheme}>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </UserProvider>
    </ChakraProvider>
  )
}