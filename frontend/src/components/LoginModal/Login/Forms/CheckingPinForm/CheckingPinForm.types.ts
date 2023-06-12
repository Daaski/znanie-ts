import * as React from 'react';
import { FormikErrors } from 'formik';
import { FormType } from 'components/LoginModal/Login/Login.types';

export type FormValues = string[];

export interface ICheckingPinFormProps {
    setFormType: (type: FormType) => void;
    data: { tel: string; exists: boolean; password: string };
    type: 'email' | 'authPhone' | 'registerPhone';
    handleVisibility: () => void;
}

export interface IPinCodeInputProps {
    digits: FormValues;
    changeHandler: (
        values: React.SetStateAction<FormValues>,
        shouldValidate?: boolean
    ) => void;
    errors: FormikErrors<{ code: string }>;
}
