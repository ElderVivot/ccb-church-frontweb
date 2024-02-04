import axios, { AxiosResponse } from 'axios'
import { v4 as uuid } from 'uuid'

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
        const newDataLancs = []
        for (const [idx, lanc] of data.lancs.entries()) {
            if (lanc.amount > 0) {
                const objToSave = data.lancs[idx]
                if (!lanc.id && lanc.amount > 0) objToSave.id = uuid()
                if (!lanc.idCentroCusto) objToSave.idCentroCusto = ''
                if (!lanc.descriptionProof) objToSave.descriptionProof = ''
                if (!lanc.comments) objToSave.comments = ''
                newDataLancs.push(objToSave)
            }
        }
        data.lancs = newDataLancs
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