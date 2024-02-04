import dynamic from 'next/dynamic'
const Spreadsheets = dynamic(
    () => import('./pageToReact'),
    {
        ssr: false
    }
)

export function OfertasAvulsasDataToFillComponent({ id }): JSX.Element {
    return <Spreadsheets id={id} />
}