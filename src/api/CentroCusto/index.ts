import axios, { AxiosResponse } from 'axios'

import { api } from '@services/api'

import { ICentroCusto } from './ICentroCusto'

export const fetchDataCentroCusto = async (filter = ''): Promise<AxiosResponse<ICentroCusto[], any> | null> => {
    try {
        const url = `centro_custo${filter ? `?${filter}` : ''}`
        const result = await api.get<ICentroCusto[]>(url)
        return result
    } catch (error) {
        return null
    }
}

export const postCentroCusto = async (data: ICentroCusto): Promise<AxiosResponse<ICentroCusto>> => {
    try {
        const url = 'centro_custo/'
        const result = await api.post(url, { ...data })
        return result
    } catch (error) {
        if (axios.isAxiosError(error)) console.log(error.response.data)
        else console.log(error)
        return null
    }
}