export interface IOrdemPagtoList {
    idOrdemPagto: string
    createdAt: Date
    updatedAt: Date
    status: 'OPENED' | 'CANCELED' | 'PAYED' | 'DELETED'
    nameProvider: string
    formPayment: 'BOLETO' | 'PIX' | 'TED'
    goalOrdemPagto: 'REFORMA' | 'CONSTRUCAO' | 'MANUTENCAO' | 'TRANSF' | 'COZINHA' | 'SETOR_DML' | 'SETOR_ADMINISTRATIVO' | 'PIEDADE' | 'ENERGIA_SOLAR' | 'FOLHA_PAGTO' | 'IMPOSTOS' | 'ADMINISTRACAO'
    additionalDescription?: string
    bankProvider?: string
    agencyBankProvider?: string
    accountBankProvider?: string
    pixProvider?: string
    urlOrder?: string
    urlNF?: string
    urlBoleto?: string
    urlPaymentProof?: string
    amountOrdemPagto: number
    namesCentroCusto: string
}