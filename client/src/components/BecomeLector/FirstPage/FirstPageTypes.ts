import { FormikErrors, FormikTouched } from 'formik';
import { BecomeLectorTypes } from 'components/BecomeLector/BecomeLector.types';
import { IUser } from 'store/types/userStore.types';
import { ChangeEventHandler } from 'react';

export interface FirstPageProps {
    errors: FormikErrors<BecomeLectorTypes>;
    values: BecomeLectorTypes;
    touched: FormikTouched<BecomeLectorTypes>;
    setFieldTouched: (field: string, b: boolean) => void;
    setFieldValue: (
        field: string,
        v: string | Date | { id?: number; name: string; subject?: string }
    ) => void;
    handleBlur: <T>(e: T) => void;
    setPage: (page: number) => void;
    user: IUser;
}

export interface SecondPageProps extends Omit<FirstPageProps, 'setPage'> {
    handleChange: ChangeEventHandler;
    success: { success: boolean; message: string };
}
