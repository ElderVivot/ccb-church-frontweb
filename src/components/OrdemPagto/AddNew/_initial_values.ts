import { IOrdemPagto } from '@api/OrdemPagto/IOrdemPagto'
import { formatDate } from '@common/utils/functions'

export const initialValuesOrdemPagtoAddNew: IOrdemPagto = {
    idPaymentObjective: '',
    idUser: '',
    schedulingDate: formatDate(new Date(), '', 'yyyy-MM-dd'),
    status: 'OPENED',
    nameProvider: '',
    formPayment: 'BOLETO',
    dataToPayment: '',
    numberNote: '',
    numberOrder: '',
    additionalDescription: '',
    urlOrder: '',
    urlNF: '',
    urlBoleto: '',
    urlPaymentProof: '',
    urlDataToPayment: '',
    amountOrdemPagto: 0,
    idCentroCusto: '',
    OrdemPagtoCCustos: []
}