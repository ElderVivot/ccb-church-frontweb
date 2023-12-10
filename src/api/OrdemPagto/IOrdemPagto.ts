export interface IOrdemPagto {
    idOrdemPagto?: string
    idPaymentObjective?: string
    idUser?: string
    createdAt?: Date
    updatedAt?: Date
    schedulingDate: string
    status: 'OPENED' | 'CANCELED' | 'PAYED' | 'DELETED' | 'LAUNCHED_SYSTEM'
    nameProvider: string
    formPayment: 'BOLETO' | 'PIX' | 'TED'
    dataToPayment: string
    numberNote?: string
    numberOrder?: string
    additionalDescription?: string
    urlOrder?: string
    urlNF?: string
    urlBoleto?: string
    urlPaymentProof?: string
    urlDataToPayment?: string
    amountOrdemPagto: number
    nameCentroCusto?: string
    idCentroCusto?: string
    OrdemPagtoCCustos?: {
        idCentroCusto: string,
        amount: number | string
    }[]
}