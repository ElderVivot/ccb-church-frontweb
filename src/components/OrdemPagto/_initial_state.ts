import { TableState } from 'react-table'

export const initialState: Partial<TableState<object>> = {
    sortBy: [
        {
            id: 'dateToPayment',
            desc: true
        }
    ],
    pageSize: 100
}