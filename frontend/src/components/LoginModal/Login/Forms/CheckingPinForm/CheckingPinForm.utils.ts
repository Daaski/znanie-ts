import { FormValues } from 'components/LoginModal/Login/Forms/CheckingPinForm/CheckingPinForm.types';
import { isNumeric } from 'helpers/isNumeric';


export const CheckingPinFormUtils = (values: FormValues) => {
    const errors: {notFull?: string} = {}


    if (!isNumeric(values[values.length - 1])) {
        errors.notFull = 'Не полный код'
    }

    return errors
}