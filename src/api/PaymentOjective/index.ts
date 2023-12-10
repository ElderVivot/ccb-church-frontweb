import axios, { AxiosResponse } from 'axios'

import { api } from '@services/api'

import { IPaymentObjective } from './IPaymentObjective'

export const fetchDataPaymentObjective = async (filter = ''): Promise<AxiosResponse<IPaymentObjective[], any> | null> => {
    try {
        const url = `payment_objective${filter ? `?${filter}` : ''}`
        const result = await api.get<IPaymentObjective[]>(url)
        return result
    } catch (error) {
        return null
    }
}

export const postPaymentObjective = async (data: IPaymentObjective): Promise<AxiosResponse<IPaymentObjective>> => {
    try {
        const url = 'payment_objective/'
        const result = await api.post(url, { ...data })
        return result
    } catch (error) {
        if (axios.isAxiosError(error)) console.log(error.response.data)
        else console.log(error)
        return null
    }
}