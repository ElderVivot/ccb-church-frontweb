import { api } from '@services/api'

import { IUser } from './interfaces'

export const signInRequest = async (username: string, password: string): Promise<{status: number, user: IUser | null, accessToken: string}> => {
    try {
        const response = await api.post('auth/signin', { username, password })

        api.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`

        return {
            status: response.status,
            user: response.data.user,
            accessToken: response.data.accessToken
        }
    } catch (error) {
        return {
            status: error.response.status,
            user: null,
            accessToken: ''
        }
    }
}

export const getDataUserPerAccessToken = async (accessToken: string): Promise<{status: number, user: IUser | null}> => {
    try {
        const response = await api.post('auth/get_data_user', { accessToken })

        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

        return {
            status: response.status,
            user: response.data
        }
    } catch (error) {
        return {
            status: error.response.status,
            user: null
        }
    }
}