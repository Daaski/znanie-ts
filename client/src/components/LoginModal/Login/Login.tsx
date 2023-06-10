import { useState } from 'react';

import { PhoneForm } from 'components/LoginModal/Login/Forms/PhoneForm/PhoneForm';
import { CheckingPinForm } from 'components/LoginModal/Login/Forms/CheckingPinForm';
import * as T from 'components/LoginModal/Login/Login.types';
import UserIcon from 'components/LoginModal/Login/icons/UserIcon.svg';
import EscapeSvg from 'components/LoginModal/Login/icons/Escape.svg';

import css from 'components/LoginModal/Login/Login.module.scss';
import { EnterFullInfo } from 'components/LoginModal/Login/Forms/EnterFulllInfo';

interface LoginProps {
    modalVisible: boolean;
    setModalVisible: (b: boolean) => void;
}

export const Login = ({ modalVisible, setModalVisible }: LoginProps) => {
    const [formType, setFormType] = useState<T.FormType>('');
    const [userData, setUserData] = useState<T.UserData>({
        tel: '',
        exists: false,
        password: '',
    });

    const handleVisibility = () => {
        setModalVisible(!modalVisible);
        setFormType('');
    };

    const renderForm = (type: string) => {
        switch (type) {
            case 'phone':
                return (
                    <PhoneForm
                        setUserData={setUserData}
                        setFormType={setFormType}
                    />
                );

            case 'checkingPinPhone':
                return (
                    <CheckingPinForm
                        handleVisibility={handleVisibility}
                        setFormType={setFormType}
                        data={userData}
                        type="authPhone"
                    />
                );
            case 'registerPinPhone':
                return (
                    <CheckingPinForm
                        handleVisibility={handleVisibility}
                        setFormType={setFormType}
                        data={userData}
                        type="registerPhone"
                    />
                );
            case 'completeRegister':
                return (
                    <EnterFullInfo
                        data={userData}
                        handleVisibility={handleVisibility}
                    />
                );
            default:
                return (
                    <PhoneForm
                        setFormType={setFormType}
                        setUserData={setUserData}
                    />
                );
        }
    };

    return (
        <>
            <div
                onClick={() => setModalVisible(!modalVisible)}
                className={css.login}
            >
                <UserIcon />
                <p className={css.login_text}>Войти</p>
            </div>
            {modalVisible && (
                <div
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            handleVisibility();
                        }
                    }}
                    onClick={() => handleVisibility()}
                    className={css.modal_wrapper}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={css.modal}
                    >
                        <button
                            onClick={() => handleVisibility()}
                            className={css.escape}
                            type={'button'}
                        >
                            <EscapeSvg />
                        </button>
                        <h2 className={css.form_header}>Войти на платформу</h2>
                        <div className={css.form_wrapper}>
                            {renderForm(formType)}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
