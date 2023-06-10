import * as T from 'components/LoginModal/Login/Forms/PhoneForm/PhoneForm.types';
import { FormikErrors } from 'formik';

export const phoneFormUtils = (values: T.IPhoneForm) => {
    const errors: FormikErrors<T.IPhoneForm> = {};

    if (!values.tel.match(/\(9..\)/)?.length) {
        errors.tel = 'поддерживаются номера с +79...';
    } else if (!values.tel.match(/\d$/)?.length) {
        errors.tel = 'неверный формат номера';
    }

    return errors;
};
