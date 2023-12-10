export interface IPaymentObjective {
    idPaymentObjective: string
    name: string
    status: 'ACTIVE' | 'INACTIVE'
    createdAt: Date
    updatedAt: Date
}