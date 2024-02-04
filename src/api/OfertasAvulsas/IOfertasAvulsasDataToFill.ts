export interface IOfertasAvulsas {
    dateMovement: Date
    amount: number
    bank: string
    receivedFrom: string
    descriptionProof: string
    idCentroCusto: string
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