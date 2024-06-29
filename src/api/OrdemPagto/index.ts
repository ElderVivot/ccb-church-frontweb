import axios, { AxiosResponse } from 'axios'

import { api } from '@services/api'

import { IOrdemPagto } from './IOrdemPagto'

export const fetchDataOrdemPagto = async (filter = ''): Promise<AxiosResponse<IOrdemPagto[], any> | null> => {
    try {
        const url = `ordem_pagto${filter ? `?${filter}` : ''}`
        const result = await api.get<IOrdemPagto[]>(url)
        return result
    } catch (error) {
        return null
    }
}

export const postOrdemPagto = async (data: IOrdemPagto): Promise<AxiosResponse<IOrdemPagto>> => {
    try {
        const url = 'ordem_pagto/'
        const result = await api.post(url, { ...data })
        return result
    } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error)) console.log(error.response.data)
        else console.log(error)
        return null
    }
}

export const putOrdemPagto = async (data: IOrdemPagto): Promise<AxiosResponse<IOrdemPagto>> => {
    try {
        const url = `ordem_pagto/${data.idOrdemPagto}`
        console.log(data)
        const result = await api.put(url, { ...data })
        return result
    } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error)) console.log(error.response.data)
        else console.log(error)
        return null
    }
}