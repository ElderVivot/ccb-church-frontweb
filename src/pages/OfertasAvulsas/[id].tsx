import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { LayoutDefault } from '@components/_LayoutDefault'
import { OfertasAvulsasDataToFillComponent } from '@components/OfertasAvulsas/DataToFill'

export default function OfertasAvulsas(): JSX.Element {
    const router = useRouter()

    const [id, setid] = useState('')
    useEffect(() => {
        if (router.query.id) setid(typeof router.query.id === 'string' ? router.query.id : router.query.id[0])
    }, [router.query.id])

    return (
        <>
            <LayoutDefault title='CCB - Ofertas Avulsas'>
                <OfertasAvulsasDataToFillComponent id={id} />
            </LayoutDefault>
        </>
    )
}