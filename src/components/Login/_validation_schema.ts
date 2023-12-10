import * as Yup from 'yup'

export const validationSchemaLogin = Yup.object().shape({
    username: Yup.string().required('Informe o usuário'),
    password: Yup.string().required('Informe a senha')
})