import { TableState } from 'react-table'

export const initialState: Partial<TableState<object>> = {
    sortBy: [
        {
            id: 'updatedAt',
            desc: true
        }
    ],
    pageSize: 100
}