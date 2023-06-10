import { FocusEvent } from 'react';
import { FormikErrors } from 'formik';

export interface InputSelectProps {
    type: string;
    value: { id?: number; name: string };
    name: string;
    onBlur: (event: FocusEvent<HTMLInputElement>) => void;
    onChange: (v: { id?: number; name: string }) => void;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    dropdownName: string;
    autoComplete: string;
    which: 'univer/' | 'address/';
    handleError: FormikErrors<{ id?: number; name: string; subject?: string }>;
}
