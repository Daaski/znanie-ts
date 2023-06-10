import * as React from 'react';
import { FormikErrors } from 'formik';

export type FormValues = string[];

export interface ICheckingPinFormProps {
    setFormType: (
        type:
            | 'checkingPinPhone'
            | 'checkingPinEmail'
            | 'phone'
            | 'email'
            | 'completeRegister'
    ) => void;
    data: { tel: string; exists: boolean; password: string };
    type: 'email' | 'authPhone';
    handleVisibility: () => void;
}

export interface IPinCodeInputProps {
    digits: FormValues;
    changeHandler: (
        values: React.SetStateAction<FormValues>,
        shouldValidate?: boolean
    ) => void;
    errors: { code: string };
}
