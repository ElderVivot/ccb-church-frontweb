import { TableState } from 'react-table'

import { IOrdemPagto } from '@api/OrdemPagto/IOrdemPagto'

export const initialState: Partial<TableState<IOrdemPagto>> = {
    pageSize: 100
}