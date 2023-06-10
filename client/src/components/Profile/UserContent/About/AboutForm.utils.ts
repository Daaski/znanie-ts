import * as T from './About.types';
import { isNumeric } from 'helpers/isNumeric';

const emailCheck = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/gi;

export function aboutFormUtils(values: T.UserFormTypes) {
    const errors: Partial<T.ErrorsTypes> = {};

    if (!values.name) {
        errors.name = 'Обязательное поле';
    } else if (isNumeric(values.name)) {
        errors.name = 'Не может содержать цифры';
    }

    if (!values.surname) {
        errors.surname = 'Обязательное поле';
    } else if (isNumeric(values.surname)) {
        errors.surname = 'Не может содержать цифры';
    }

    if (isNumeric(values.patronymic)) {
        errors.patronymic = 'Не может сожержать цифры';
    }

    if (!values.phone?.match(/\(9..\)/)?.length) {
        errors.phone = 'поддерживаются номера с +79...';
    } else if (!values?.phone.match(/\d$/)?.length) {
        errors.phone = 'неверный формат номера';
    }

    if (values.jobTitle !== '' && !values.job) {
        errors.job = 'Обязательное поле';
    } else if (isNumeric(values.job)) {
        errors.job = 'Не может содержать цифры';
    }

    if (!values.education.name && values.educationEnd) {
        if (values.educationEnd !== '____') {
            errors.education = 'Обязательное поле';
            !values.speciality ? (errors.speciality = 'Обязательное поле') : '';
        }
    } else if (!values.education.name && values.speciality) {
        errors.education = 'Обязательное поле';
        errors.educationEnd = 'Обязательное поле';
    } else if (
        values.education &&
        /\d$/.test(values.educationEnd) &&
        values.educationEnd.length < 4 &&
        values.educationEnd.length > 0
    ) {
        errors.educationEnd = 'Должно содержать 4 цифры';
    }

    if (!values?.email?.match(emailCheck)?.length && values.email) {
        errors.email = 'некорректный email';
    }

    if (isNumeric(values.job)) {
        errors.job = 'Не может содержать цифры';
    }

    if (isNumeric(values.jobTitle)) {
        errors.jobTitle = 'Не может содержать цифры';
    }
    return errors;
}
