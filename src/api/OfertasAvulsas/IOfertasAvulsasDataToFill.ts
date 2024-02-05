export interface IOfertasAvulsas {
    id?: string
    dateMovement: Date
    amount: number
    bank: string
    receivedFrom: string
    descriptionProof: string
    nameCentroCusto: string
    idCentroCusto?: string
    comments: string
    alreadyMigrate?: number
}

export interface IItemOfertasAvulsasDataToFill {
    id: string
    startPeriod: string
    endPeriod: string
    updatedAt: string
    idUser: string
    lancs?: IOfertasAvulsas[]
}

export interface IOfertasAvulsasDataToFill {
    Item?: IItemOfertasAvulsasDataToFill
}