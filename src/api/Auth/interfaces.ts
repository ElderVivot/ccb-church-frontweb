export interface IUser {
    idUser: string
    nameUser: string
    createdAt: Date
    updatedAt: Date
    username: string
    password: string
    permissions: string
    email: string
    status: 'ACTIVE' | 'INACTIVE'
}

export interface ISignInData {
    status: number
    user: IUser | null
    accessToken: string
}