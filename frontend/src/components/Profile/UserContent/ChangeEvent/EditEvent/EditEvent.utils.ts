import {
    EditEventErrors,
    EditEventForm,
} from 'components/Profile/UserContent/ChangeEvent/EditEvent/EditEventTypes';
import { FormikErrors } from 'formik';
import { isNumeric } from 'helpers/isNumeric';

export const EditEventValidate = (values: EditEventForm) => {
    const errors: FormikErrors<EditEventErrors> = {};

    if (!values.name) {
        errors.name = 'Обязательное поле';
    } else if (isNumeric(values.name)) {
        errors.name = 'Не может содержать цифры';
    }
    if (!values.about) {
        errors.about = 'Обязательное поле';
    }
    if (!values.description) {
        errors.description = 'Обязательное поле';
    }

    if (values.address.id === 0) {
        errors.address = 'Обязательное поле' as FormikErrors<{
            pk: number;
            name: string;
            subject: string;
            type: string;
        }>;
    }

    if (!values.image) {
        errors.image = 'Обязательное поле';
    }

    if (values.start.getTime() > values.end.getTime()) {
        errors.start = 'Дата начала не может быть больше конца';
        errors.end = 'Дата конца не может быть больше начала';
    }

    if (values.start.getTime() < Date.now()) {
        errors.start = 'Мероприятие не может быть в прошлом';
        errors.end = 'Мероприятие не может быть в прошлом';
    }

    if (values.end.getTime() < Date.now()) {
        errors.start = 'Мероприятие не может быть в прошлом';
        errors.end = 'Мероприятие не может быть в прошлом';
    }

    return errors;
};
