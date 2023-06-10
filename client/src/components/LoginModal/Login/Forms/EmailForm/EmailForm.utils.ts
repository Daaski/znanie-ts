import * as T from 'components/LoginModal/Login/Forms/EmailForm/EmailForm.types';
import { FormikErrors } from 'formik';

const emailCheck = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/gi;

export const emailFormUtils = (values: T.IEmailForm) => {
    const errors: FormikErrors<T.IEmailForm> = {};

    if (!values.email) {
        errors.email = 'обязательное поле';
    } else if (!values.email.match(emailCheck)?.length) {
        errors.email = 'некорректный email';
    }

    if (!values.password) {
        errors.password = 'обязательное поле';
    } else if (values.password.length < 8) {
        errors.password = 'длина пароля должна быть больше 8 символов';
    }

    return errors;
};
