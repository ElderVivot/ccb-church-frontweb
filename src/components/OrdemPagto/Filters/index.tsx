import { PropsWithChildren } from 'react'

import { IFilters } from '../_interfaces'
import { LoginComponent } from './Login'
import { NameAccessComponent } from './NameAccess'
import { StatusAccessPortalsComponent } from './StatusAccess'
import { TypeAccessPortalsComponent } from './TypeAccessPortals'

interface IProps extends PropsWithChildren<object> {
    filters: IFilters
    setFilters: any
}

export function FilterComponent({ filters, setFilters }: IProps): JSX.Element {
    return (
        <>
            <StatusAccessPortalsComponent filters={filters} setFilters={setFilters} />
            <TypeAccessPortalsComponent filters={filters} setFilters={setFilters} />
            <LoginComponent filters={filters} setFilters={setFilters} />
            <NameAccessComponent filters={filters} setFilters={setFilters} />
        </>
    )
}