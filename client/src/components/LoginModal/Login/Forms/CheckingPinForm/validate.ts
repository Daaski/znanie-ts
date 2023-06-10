import * as T from 'components/LoginModal/Login/Forms/CheckingPinForm/CheckingPinForm.types';

export const validate = (values: T.FormValues) => {
    const errors: {} = {};
    if (values.includes('')) {
        errors.codeErr = 'Not full';
    }

    if (values) return errors;
};
