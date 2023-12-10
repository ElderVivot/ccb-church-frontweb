import * as Yup from 'yup'

export const validationSchemaOrdemPagto = Yup.object().shape({
    schedulingDate: Yup.string().required('Informe a data'),
    amountOrdemPagto: Yup.number().positive('Maior do que zero').required('Informe valor'),
    idCentroCusto: Yup.string().required('Selecione centro de custo'),
    idPaymentObjective: Yup.string().required('Selecione finalidade despesa'),
    nameProvider: Yup.string().required('Informe nome fornecedor'),
    formPayment: Yup.string().required('Selecione opção válida'),
    dataToPayment: Yup.string().required('Informe dados pra pagamento'),
    numberNote: Yup.string().optional(),
    numberOrder: Yup.string().optional(),
    additionalDescription: Yup.string().optional(),
    urlOrder: Yup.string().optional(),
    urlNF: Yup.string().optional(),
    urlBoleto: Yup.string().optional(),
    urlPaymentProof: Yup.string().optional(),
    urlDataToPayment: Yup.string().optional()
})