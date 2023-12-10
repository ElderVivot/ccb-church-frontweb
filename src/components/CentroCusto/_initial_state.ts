import { TableState } from 'react-table'

export const initialState: Partial<TableState<object>> = {
    sortBy: [
        {
            id: 'codeCentroCusto',
            desc: false
        }
    ],
    pageSize: 100
}