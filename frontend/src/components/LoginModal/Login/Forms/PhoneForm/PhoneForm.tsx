import { FC } from 'react';
import { InputMask } from 'components/UI/Inputs/InputMask/InputMask';
import { useFormik } from 'formik';

import { phoneFormUtils } from 'components/LoginModal/Login/Forms/PhoneForm/PhoneForm.utils';
import * as T from 'components/LoginModal/Login/Forms/PhoneForm/PhoneForm.types';

import css from 'components/LoginModal/Login/Login.module.scss';
import { checkPhone } from 'http/userApi';

export const PhoneForm: FC<T.IPhoneFormProps> = ({
    setFormType,
    setUserData,
}) => {
    const onSubmit = async (values: T.IPhoneForm) => {
        const { exist, password } = await checkPhone(values.tel);
        setUserData({ tel: values.tel, exists: exist, password: password });
        if (exist) {
            setFormType('checkingPinPhone');
        }
        if (!exist) {
            setFormType('registerPinPhone');
        }
    };

    const {
        touched,
        setFieldTouched,
        isValid,
        setFieldValue,
        handleSubmit,
        values,
        errors,
    } = useFormik<T.IPhoneForm>({
        initialValues: { tel: '' },
        validate: phoneFormUtils,
        onSubmit,
    });

    return (
        <form onSubmit={handleSubmit} className={css.modal_form}>
            <InputMask
                label="Введите номер телефона"
                name="tel"
                placeholder="+7(___)___-__-__"
                handleError={errors.tel}
                value={values.tel}
                alwaysShowMask={true}
                autoFocus={true}
                mask="+7(999)999-99-99"
                onBlur={() => setFieldTouched('tel', true)}
                onChange={(value: string) => {
                    setFieldTouched('tel', true);
                    setFieldValue('tel', value);
                }}
                type="tel"
            />
            <button
                className={css.submit_button}
                type="submit"
                disabled={!isValid || !touched.tel}
            >
                Получить код
            </button>
        </form>
    );
};
