import { HeaderGroupPropGetter, UseSortByColumnProps, ColumnInstance, TableHeaderProps, UseFiltersColumnProps, UseTableHooks, UseFiltersOptions } from 'react-table'

type THeader<D> = ColumnInstance<D> & UseSortByColumnProps<D> & UseFiltersColumnProps<D> & UseFiltersOptions<D>
export type THeaderGroup<D extends object> = {
    getHeaderGroupProps: (propGetter?: HeaderGroupPropGetter<D>) => TableHeaderProps
    headers: THeader<D>[]
}

export type TFilterProps<D extends object> = UseTableHooks<D> & {
    column: ColumnInstance<D> & UseFiltersColumnProps<D>,
    optionsSelect?: object
}