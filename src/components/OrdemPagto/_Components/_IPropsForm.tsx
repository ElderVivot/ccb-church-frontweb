import { FormikErrors } from 'formik'
import { ChangeEvent, PropsWithChildren } from 'react'

import { IAccessPortals } from '@api/tenant/AccessPortals/IAccessPortals'

export interface IPropsFormAccessPortals extends PropsWithChildren<object> {
    errors: FormikErrors<IAccessPortals>
    values: IAccessPortals
    handleBlur: {
        /** Classic React blur handler, keyed by input name */
        (e: React.FocusEvent<any>): void;
        /** Preact-like linkState. Will return a handleBlur function. */
        <T = string | any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
    }
    handleChange: {
        /** Classic React change handler, keyed by input name */
        (e: React.ChangeEvent<any>): void;
        /** Preact-like linkState. Will return a handleChange function.  */
        <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
    }
    setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void
}