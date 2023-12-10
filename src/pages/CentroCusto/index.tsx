import { LayoutDefault } from '@components/_LayoutDefault'
import { CentroCusto as CentroCustoComponent } from '@components/CentroCusto'

export default function CentroCusto(): JSX.Element {
    return (
        <>
            <LayoutDefault title='CCB - Ordem Pagto'>
                <CentroCustoComponent />
            </LayoutDefault>
        </>
    )
}