import { FormikErrors } from 'formik';
import {
    BecomeLectorTypes,
    ErrorLectorsTypes,
} from 'components/BecomeLector/BecomeLector.types';
import { isNumeric } from 'helpers/isNumeric';

const emailCheck = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/gi;

export const BecomeLectorsValidate = (values: BecomeLectorTypes) => {
    const errors: FormikErrors<ErrorLectorsTypes> = {};

    if (values.jobTitle !== '' && !values.job) {
        errors.jobTitle = 'Обязательное поле';
    }

    if (values.patronymic === '') {
        errors.patronymic = 'Обязательное поле';
    } else if (isNumeric(values.patronymic)) {
        errors.patronymic = 'не может содержать цифры';
    }

    if (values.name === '') {
        errors.name = 'Обязательное поле';
    } else if (isNumeric(values.name)) {
        errors.name = 'не может содержать цифры';
    }

    if (values.surname === '') {
        errors.surname = 'Обязательное поле';
    } else if (isNumeric(values.surname)) {
        errors.surname = 'не может содержать цифры';
    }

    if (values.address?.id === 0) {
        errors.address = 'Обязательное поле';
    }

    if (values.education.id === 0) {
        errors.education = 'Обязательное поле';
    }

    if (values.educationEnd === '') {
        errors.educationEnd = 'Обязательное поле';
    } else if (values?.educationEnd?.length < 4) {
        errors.educationEnd = 'Должно содержать 4 цифры';
    }

    if (values.speciality === '') {
        errors.speciality = 'Обязательное поле';
    }

    if (values.email === '') {
        errors.email = 'Обязательное поле';
    } else if (!values?.email?.match(emailCheck)?.length && values.email) {
        errors.email = 'некорректный email';
    }

    if (values.job === '') {
        errors.job = 'Обязательное поле';
    } else if (isNumeric(values.job)) {
        errors.job = 'не может содержать цифры';
    }

    if (values.jobTitle === '') {
        errors.jobTitle = 'Обязательное поле';
    } else if (isNumeric(values.jobTitle)) {
        errors.jobTitle = 'не может содержать цифры';
    }

    return errors;
};
