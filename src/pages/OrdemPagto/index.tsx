import { LayoutDefault } from '@components/_LayoutDefault'
import { OrdemPagto as OrdemPagtoComponent } from '@components/OrdemPagto'

export default function OrdemPagto(): JSX.Element {
    return (
        <>
            <LayoutDefault title='CCB - Ordem Pagto'>
                <OrdemPagtoComponent />
            </LayoutDefault>
        </>
    )
}