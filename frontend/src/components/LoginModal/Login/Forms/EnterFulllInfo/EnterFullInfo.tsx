import * as T from 'components/LoginModal/Login/Forms/EnterFulllInfo/EnterFullInfo.types';
import { useFormik } from 'formik';

import { EnterFullInfoValidate } from 'components/LoginModal/Login/Forms/EnterFulllInfo/EnterFullInfo.utils';
import { Input } from 'components/UI/Inputs/Input';
import { InputDate } from 'components/UI/Inputs/InputDate';
import { authToken, registerUser } from 'http/userApi';
import { useUserStore } from 'store/UserStore';
import { setFullUser } from 'lib/setFullUser';

import css from 'components/LoginModal/Login/Forms/EnterFulllInfo/EnterFullInfo.module.scss';

export const EnterFullInfo = ({
    handleVisibility,
    data,
}: T.EnterFullInfoProps) => {
    const [setUser] = useUserStore((state) => [state.setUser]);
    const onSubmit = (values: T.FormikData) => {
        values.tel = values.tel.replace(/[()-]/g, '');
        registerUser(
            values.surname,
            values.tel,
            values.name,
            JSON.stringify(values.birthdate).slice(1, 11),
            values.password
        ).then((r) => {
            authToken(values.tel, r.password).then(() => setFullUser(setUser));
        });
        handleVisibility();
    };

    const {
        touched,
        values,
        setFieldTouched,
        setFieldValue,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
    } = useFormik<T.FormikData>({
        initialValues: {
            name: '',
            tel: data.tel,
            birthdate: new Date(),
            exists: data.exists,
            password: 'userpass',
            surname: '',
        },
        onSubmit,
        validate: EnterFullInfoValidate,
    });

    return (
        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <Input
                type="text"
                value={values.name}
                name="name"
                handleError={touched.name ? errors.name : ''}
                onBlur={handleBlur}
                onChange={handleChange}
                label="Имя"
                placeholder="Укажите Ваше имя"
            />
            <Input
                type="text"
                value={values.surname}
                name="surname"
                handleError={touched.surname ? errors.surname : ''}
                onBlur={handleBlur}
                onChange={handleChange}
                label="Фамилия"
                placeholder="Укажите Вашу фамилию"
            />
            <InputDate
                value={values.birthdate}
                onChange={(date) => setFieldValue('birthdate', date)}
                alwaysShowMask={true}
                mask="99.99.9999"
                placeholder=""
                label="Дата рождения"
                type="text"
                name="birthdate"
                handleError={touched.birthdate && (errors.birthdate as string)}
                onBlur={() => setFieldTouched('start', true)}
            />
            <button className={css.submit_button} type="submit">
                Зарегистрироваться
            </button>
        </form>
    );
};
