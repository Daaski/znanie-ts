import { Input } from 'components/UI/Inputs/Input';
import { InputDate } from 'components/UI/Inputs/InputDate';
import { InputSelect } from 'components/UI/Inputs/InputSelect';
import React from 'react';
import { FirstPageProps } from 'components/BecomeLector/FirstPage/FirstPageTypes';

import css from './FirstPage.module.scss';

export const FirstPage = ({
    handleChange,
    values,
    touched,
    errors,
    setFieldTouched,
    setFieldValue,
    handleBlur,
    setPage,
    user,
}: FirstPageProps) => {
    const handleChangeClick = () => {
        if (!values.patronymic || !values.address?.name || !values.birthdate) {
            setFieldTouched('patronymic', true);
            setFieldTouched('address', true);
            setFieldTouched('birthdate', true);
        } else setPage(2);
    };

    return (
        <div className={css.first_page_form}>
            <div className={css.form_name}>
                <Input
                    disabled={!!user.name}
                    placeholder="Укажите имя"
                    type="text"
                    value={values.name}
                    name="name"
                    handleError={touched.name ? errors.name : ''}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Имя*"
                />
            </div>
            <div className={css.form_surname}>
                <Input
                    disabled={!!user.surname}
                    placeholder="Укажите фамилию"
                    type="text"
                    value={values.surname}
                    name="surname"
                    handleError={touched.surname ? errors.surname : ''}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Фамилия*"
                />
            </div>
            <div className={css.form_patronymic}>
                <Input
                    disabled={!!user.patronymic}
                    type="text"
                    value={values.patronymic ?? ''}
                    name="patronymic"
                    handleError={touched.patronymic ? errors.patronymic : ''}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Отчество*"
                    placeholder="Укажите отчество"
                />
            </div>
            <div className={css.form_birthdate}>
                <InputDate
                    disabled={!!user.birthday}
                    name="birthdate"
                    onChange={(date: Date) => setFieldValue('birthdate', date)}
                    label="Дата рождения*"
                    value={values.birthdate}
                    onBlur={handleBlur}
                    placeholder={values.birthdate?.toString()}
                    mask="99.99.9999"
                    alwaysShowMask={true}
                    type="text"
                />
            </div>
            <div className={css.form_address}>
                <InputSelect
                    disabled={user.addressId !== 0}
                    dropdownName="населённого пункта"
                    type="text"
                    value={
                        values.address as {
                            id?: number;
                            name: string;
                            subject: string;
                        }
                    }
                    name="address"
                    onBlur={handleBlur}
                    onChange={(v: { id?: number; name: string }) => {
                        setFieldValue('address', v);
                    }}
                    label="Регион проживания*"
                    placeholder="Укажите населённый пункт"
                    which="address/"
                    autoComplete="off"
                    handleError={touched.address && (errors.address as any)}
                />
            </div>
            <button
                type={'button'}
                onClick={handleChangeClick}
                className={css.next_page_button}
            >
                Далее
            </button>
        </div>
    );
};
