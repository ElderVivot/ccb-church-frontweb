import axios, { AxiosResponse } from 'axios'
import { v4 as uuid } from 'uuid'

import { apiOfertasAvulsas as api } from '@services/api'

import { IOfertasAvulsasDataToFill, IItemOfertasAvulsasDataToFill } from './IOfertasAvulsasDataToFill'

export const fetchDataOfertasAvulsasPerID = async (id: string): Promise<AxiosResponse<IOfertasAvulsasDataToFill, any> | null> => {
    if (!id) return null
    try {
        const url = `ofertas-avulsas/${id}`
        const result = await api.get<IOfertasAvulsasDataToFill>(url)
        return result
    } catch (error) {
        if (axios.isAxiosError(error)) console.log(error.response.data)
        else console.log(error)
        return null
    }
}

export const putOfertasAvulsasPerId = async (data: IItemOfertasAvulsasDataToFill, centroCustoDePara: object): Promise<AxiosResponse<IOfertasAvulsasDataToFill>> => {
    try {
        const url = 'ofertas-avulsas'
        const newDataLancs = []
        for (const [idx, lanc] of data.lancs.entries()) {
            if (lanc.amount > 0) {
                const objToSave = data.lancs[idx]
                if (!lanc.id && lanc.amount > 0) objToSave.id = uuid()
                if (!lanc.nameCentroCusto) objToSave.nameCentroCusto = ''
                if (!lanc.descriptionProof) objToSave.descriptionProof = ''
                if (!lanc.comments) objToSave.comments = ''
                const codeChurchSplit = lanc.nameCentroCusto.split('-')
                const codeChurchLen = codeChurchSplit.length
                const codeChurch = codeChurchSplit[codeChurchLen - 1].trim()
                if (codeChurch) objToSave.idCentroCusto = centroCustoDePara[`${codeChurch}`]
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