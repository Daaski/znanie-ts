import { useFormik } from 'formik';
import { Input } from 'components/UI/Inputs/Input/Input.tsx';

import * as T from 'components/LoginModal/Login/Forms/EmailForm/EmailForm.types';
import { emailFormUtils } from 'components/LoginModal/Login/Forms/EmailForm/EmailForm.utils';

import css from 'components/LoginModal/Login/Login.module.scss';

export const EmailForm = ({ setUserData, setFormType }: T.IEmailFormProps) => {
    const onSubmit = (values) => {
        setUserData({ email: values.email });
        setFormType('checkingPinEmail');
    };

    const {
        touched,
        values,
        setFieldTouched,
        handleBlur,
        handleChange,
        errors,
        handleSubmit,
    } = useFormik<T.IEmailForm>({
        initialValues: { email: '', password: '' },
        validate: emailFormUtils,
        onSubmit,
    });

    return (
        <form onSubmit={handleSubmit} className={css.modal_form}>
            <Input
                label="Введите Email"
                value={values.email}
                handleError={touched.email ? errors.email : ''}
                type={'email'}
                placeholder={'Введите ваш Email'}
                name={'email'}
                onChange={(e) => {
                    setFieldTouched('email', true);
                    handleChange(e);
                }}
                onBlur={handleBlur}
            />
            <div style={{ marginTop: '2px', width: '100%' }}>
                <Input
                    label="Ведите пароль"
                    value={values.password}
                    onChange={(e) => {
                        setFieldTouched('password', true);
                        handleChange(e);
                    }}
                    handleError={touched.password ? errors.password : ''}
                    type={'password'}
                    placeholder={'От 8 символов'}
                    name={'password'}
                    onBlur={handleBlur}
                />
            </div>
            <button className={css.submit_button} type={'submit'}>
                Войти
            </button>
        </form>
    );
};
