import * as T from 'components/LoginModal/Login/Forms/EnterFulllInfo/EnterFullInfo.types';
import { isNumeric } from 'helpers/isNumeric';

export const EnterFullInfoValidate = (values: T.FormikData) => {
    const errors: { surname: string; birthdate: string; name: string } = {};

    if (values.surname === '') {
        errors.surname = 'Обязательное поле';
    } else if (isNumeric(values.surname)) {
        errors.surname = 'Не может содержать цифры';
    }
    if (!values.birthdate) {
        errors.birthdate = 'Обязательное поле';
    }
    if (values.name === '') {
        errors.name = 'Обязательное поле';
    } else if (isNumeric(values.name)) {
        errors.name = 'Не может содержать цифры';
    }

    if (values.birthdate.getTime() > Date.now()) {
        errors.birthdate = 'Дата не может быть больше сегодняшней';
    }

    return errors;
};
