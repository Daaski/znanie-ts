import { useRef } from 'react';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';

import * as T from 'components/LoginModal/Login/Forms/CheckingPinForm/CheckingPinForm.types';
import { validate } from 'components/LoginModal/Login/Forms/CheckingPinForm/validate';
import { authToken } from 'http/userApi';
import PinCodeInput from 'components/LoginModal/Login/Forms/CheckingPinForm/PinCodeInput';

import css from 'components/LoginModal/Login/Forms/CheckingPinForm/CheckingPinForm.module.scss';
import { useUserStore } from 'store/UserStore';
import { setFullUser } from 'lib/setFullUser';

const generateCode = Math.floor(1000 + Math.random() * 9000)
    .toString()
    .split('');

export const CheckingPinForm = ({
    setFormType,
    data,
    type,
    handleVisibility,
}: T.ICheckingPinFormProps) => {
    const code = useRef<string[]>(generateCode);
    const [setUser] = useUserStore((state) => [state.setUser]);

    const onSubmit = (values) => {
        if (JSON.stringify(code.current) !== JSON.stringify(values)) {
            setFieldError('code', 'Вы ввели неверный код');
            return;
        }
        if (type === 'authPhone') {
            authToken(data.tel, data.password).then((r) =>
                setFullUser(setUser)
            );

            handleVisibility();
            return;
        }
        setFormType('completeRegister');
    };

    const { values, errors, setFieldError, isValid, setValues, handleSubmit } =
        useFormik<T.FormValues>({
            initialValues: ['', '', '', ''],
            onSubmit,
            validateOnMount: true,
            validate,
        });

    const handleChangeCode = () => {
        setFormType('phone');
    };

    return (
        <>
            {
                <motion.div
                    initial={{ y: '-400%' }}
                    animate={{ translateY: '400%' }}
                    transition={{ delay: 3 }}
                    className={css.code_message}
                >
                    Ваш код {code.current}
                </motion.div>
            }
            <form className={css.modal_form} onSubmit={handleSubmit}>
                <p className={css.check_description}>
                    Введите код, отправленный на <br />
                    {data.tel}{' '}
                    <button
                        onClick={handleChangeCode}
                        className={css.change_button}
                    >
                        Изменить
                    </button>
                </p>
                <PinCodeInput
                    errors={errors}
                    digits={values}
                    changeHandler={setValues}
                />
                <button
                    disabled={!isValid}
                    className={css.submit_button}
                    type="submit"
                >
                    {type === 'authPhone' ? 'Войти' : 'Зарегистрироваться'}
                </button>
            </form>
        </>
    );
};
