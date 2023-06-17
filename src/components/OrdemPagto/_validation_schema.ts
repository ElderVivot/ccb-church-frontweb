import * as Yup from 'yup'

export const validationSchemaAccessPortals = Yup.object().shape({
    idTypeAccessPortals: Yup.string().required('Selecione uma opção válida'),
    nameAccess: Yup.string().required('Informe o nome do acesso'),
    login: Yup.string().required('Informe o login do acesso'),
    password: Yup.string().required('Informe a senha do acesso'),
    status: Yup.string().required('Informe status')
})