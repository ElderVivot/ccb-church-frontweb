import { forwardRef, useRef, useEffect } from 'react'

export const CheckboxComponent = forwardRef<HTMLInputElement>(function CheckboxFunction ({ indeterminate, ...rest }, ref) {
    const defaultRef = useRef()
    const resolvedRef = ref || defaultRef

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
        <input type={'checkbox'} ref={resolvedRef} {...rest}/>
    )
})