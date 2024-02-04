import axios, { AxiosResponse } from 'axios'

import { apiOfertasAvulsas as api } from '@services/api'

import { IOfertasAvulsasDataToFill, IItemOfertasAvulsasDataToFill } from './IOfertasAvulsasDataToFill'

export const fetchDataOfertasAvulsasPerID = async (id: string): Promise<AxiosResponse<IOfertasAvulsasDataToFill, any> | null> => {
    try {
        const url = `ofertas-avulsas/${id}`
        console.log(url)
        const result = await api.get<IOfertasAvulsasDataToFill>(url)
        return result
    } catch (error) {
        if (axios.isAxiosError(error)) console.log(error.response.data)
        else console.log(error)
        return null
    }
}

export const putOfertasAvulsasPerId = async (data: IItemOfertasAvulsasDataToFill): Promise<AxiosResponse<IOfertasAvulsasDataToFill>> => {
    try {
        const url = 'ofertas-avulsas'
        for (const [idx, lanc] of data.lancs.entries()) {
            if (!lanc.idCentroCusto) data.lancs[idx].idCentroCusto = ''
        }
        const result = await api.put(url, { ...data })
        return result
    } catch (error) {
        if (axios.isAxiosError(error)) console.log(error.response.data)
        else console.log(error)
        return null
    }
}

export const deleteOfertasAvulsasPerId = async (id: string): Promise<AxiosResponse<IOfertasAvulsasDataToFill>> => {
    try {
        const url = `ofertas-avulsas/${id}`
        const result = await api.delete(url)
        return result
    } catch (error) {
        if (axios.isAxiosError(error)) console.log(error.response.data)
        else console.log(error)
        return null
    }
}