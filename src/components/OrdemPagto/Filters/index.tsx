import { PropsWithChildren } from 'react'

import { IFilters } from '../_interfaces'
import { NameCentroCustoComponent } from './NameCentroCusto'
import { NameProviderComponent } from './NameProvider'
import { SchedulingDateComponent } from './SchedulingDate'
import { StatusOrdemPagtoComponent } from './StatusOrdemPagto'

interface IProps extends PropsWithChildren<object> {
    filters: IFilters
    setFilters: any
}

export function FilterComponent({ filters, setFilters }: IProps): JSX.Element {
    return (
        <>
            <SchedulingDateComponent filters={filters} setFilters={setFilters} />
            <StatusOrdemPagtoComponent filters={filters} setFilters={setFilters} />
            <NameProviderComponent filters={filters} setFilters={setFilters} />
            <NameCentroCustoComponent filters={filters} setFilters={setFilters} />
        </>
    )
}