import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { LayoutDefault } from '@components/_LayoutDefault'
import { OrdemPagto as OrdemPagtoComponent } from '@components/OrdemPagto'

export default withPageAuthRequired(function OrdemPagto() {
    return (
        <>
            <LayoutDefault title='CCB - Ordem Pagto'>
                <OrdemPagtoComponent />
            </LayoutDefault>
        </>
    )
})