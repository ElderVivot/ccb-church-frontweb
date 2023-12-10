
enum ECentroCustoStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

export interface ICentroCusto {
    idCentroCusto: string
    codeCentroCusto: string
    nameCentroCusto: string
    statusCentroCusto: 'ACTIVE' | 'INACTIVE'
    createdAt: Date
    updatedAt: Date
    idSetor?: string
    idAdministracao?: string
    nameSetor?: string
    nameAdministracao?: string
}