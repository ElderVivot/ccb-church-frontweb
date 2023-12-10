import axios, { AxiosInstance } from 'axios'
import { parseCookies } from 'nookies'

export function getAPIClient (ctx?: any): AxiosInstance {
    const { 'ccbchurch.token': token } = parseCookies(ctx)

    const api = axios.create({
        baseURL: process.env.API_HOST
    })

    if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`
    }

    return api
}