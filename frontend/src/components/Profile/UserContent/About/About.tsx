import React, { useState } from 'react';

import { Input } from 'components/UI/Inputs/Input';
import { InputRadio } from 'components/UI/Inputs/InputRadio';
import { InputMask } from 'components/UI/Inputs/InputMask';
import { FormikValues, useFormik } from 'formik';
import { InputDate } from 'components/UI/Inputs/InputDate';
import { UserFormTypes } from 'components/Profile/UserContent/About/About.types';
import { aboutFormUtils } from 'components/Profile/UserContent/About/AboutForm.utils';
import { Button } from 'components/UI/Button';
import { InputSelect } from 'components/UI/Inputs/InputSelect';
import { useUserStore } from 'store/UserStore';
import { updateUser } from 'http/userApi';
import { setResUser } from 'lib/setResUser';

import css from './About.module.scss';

export const About = () => {
    const [user] = useUserStore((state) => [state.user]);
    const [setUser] = useUserStore((state) => [state.setUser]);
    const [success, setSuccess] = useState({ success: false, message: '' });

    const onSubmit = (values: UserFormTypes) => {
        try {
            updateUser(
                values.surname,
                values.name,
                values.patronymic ?? '',
                JSON.stringify(values.birthdate).slice(1, 11),
                values.gender,
                values.address.id ?? 0,
                values.email,
                {
                    place: values.education.id ?? 0,
                    graduated_year: values.educationEnd ?? '',
                    major: values.speciality ?? '',
                },
                { place: values.job ?? '', position: values.jobTitle ?? '' }
            ).then((r) => setResUser(r, user, setUser));
            setSuccess({ message: 'Данные успешно сохранены', success: true });
        } catch (e: unknown) {
            setSuccess({ message: (e as Error).message, success: false });
        }
    };

    const {
        setFieldTouched,
        touched,
        handleSubmit,
        handleChange,
        values,
        errors,
        handleBlur,
        setFieldValue,
    } = useFormik<UserFormTypes>({
        initialValues: {
            name: user.name,
            surname: user.surname,
            patronymic: user.patronymic,
            gender: user.gender,
            birthdate: new Date(user.birthday),
            address:
                user.addressId !== 0
                    ? {
                          id: user.addressId,
                          name: `${user.addressSubject}, г. ${user.addressName}`,
                      }
                    : { id: 0, name: '' },
            email: user.email,
            phone: user?.tel
                ? `+7(${user.tel[2] + user.tel[3] + user.tel[4]})${
                      user.tel[5] + user.tel[6] + user.tel[7]
                  }-${user.tel[8] + user.tel[9]}-${user.tel[10] + user.tel[11]}`
                : '',
            job: user.job,
            jobTitle: user.jobTitle,
            education: {
                id: user.educationId ? +user.educationId : 0,
                name: user.education,
            },
            educationEnd: user.educationEnd,
            speciality: user.speciality,
        },
        validate: aboutFormUtils,
        onSubmit,
    });

    return (
        <section className={css.form_about_container}>
            <form className={css.form} onSubmit={handleSubmit}>
                <div className={css.form_fullName_wrapper}>
                    <Input
                        placeholder="Укажите имя"
                        type="text"
                        value={values.name}
                        name="name"
                        handleError={touched.name ? errors.name : ''}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Имя"
                    />
                    <Input
                        placeholder="Укажите фамилию"
                        type="text"
                        value={values.surname}
                        name="surname"
                        handleError={touched.surname ? errors.surname : ''}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Фамилия"
                    />
                </div>
                <div className={css.form_fullName_wrapper}>
                    <Input
                        type="text"
                        value={values.patronymic ?? ''}
                        name="patronymic"
                        handleError={
                            touched.patronymic ? errors.patronymic : ''
                        }
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Отчество"
                        placeholder="Укажите отчество"
                    />
                    <InputRadio
                        type="radio"
                        value={['male', 'female']}
                        initialValue={values.gender}
                        name="gender"
                        onChange={(v: string) => {
                            setFieldValue('gender', v);
                        }}
                        label="Пол"
                        chooseName={['М', 'Ж']}
                    />
                    <InputDate
                        name="birthdate"
                        onChange={(date: Date) =>
                            setFieldValue('birthdate', date)
                        }
                        label="Дата рождения"
                        value={values.birthdate}
                        onBlur={() => setFieldTouched('birthdate', true)}
                        placeholder={values.birthdate?.toString()}
                        mask="99.99.9999"
                        alwaysShowMask={true}
                        type="text"
                        handleError={
                            touched.birthdate && (errors.birthdate as string)
                        }
                    />
                </div>
                <InputSelect
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
                    label="Регион проживания"
                    placeholder="Укажите населённый пункт"
                    which="address/"
                    autoComplete="off"
                    handleError={touched.address && (errors.address as any)}
                />
                <Input
                    type="text"
                    value={values.email ? values.email : ''}
                    name="email"
                    handleError={touched.email ? errors.email : ''}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Email"
                    placeholder="Укажите ваш email"
                />
                <InputMask
                    disabled={true}
                    onChange={(value: string) => {
                        setFieldTouched('phone', true);
                        setFieldValue('phone', value);
                    }}
                    alwaysShowMask={true}
                    mask="+7(999)999-99-99"
                    placeholder="Укажите ваш телефон"
                    label="Телефон"
                    type="tel"
                    handleError={touched.phone ? errors.phone : ''}
                    value={values.phone}
                    name="phone"
                    onBlur={handleBlur}
                />
                <div>
                    <h2 className={css.header}>Образование</h2>
                    <InputSelect
                        which="univer/"
                        autoComplete="off"
                        type="text"
                        value={values.education}
                        handleError={
                            touched.education && (errors.education as any)
                        }
                        name="education"
                        onBlur={handleBlur}
                        onChange={(v: { id?: number; name: string }) =>
                            setFieldValue('education', v)
                        }
                        label="Укажите ВУЗ"
                        dropdownName="ВУЗа"
                        placeholder="Выберите ВУЗ"
                    />
                    <InputMask
                        onChange={(v: string) =>
                            setFieldValue('educationEnd', v)
                        }
                        alwaysShowMask={false}
                        maskPlaceholder={''}
                        mask="9999"
                        placeholder="Укажите год окончания"
                        label="Год окончания"
                        type="text"
                        value={values.educationEnd}
                        name="educationEnd"
                        handleError={errors.educationEnd}
                        onBlur={handleBlur}
                        autoComplete="off"
                    />
                    <Input
                        type="text"
                        value={values.speciality}
                        name="speciality"
                        handleError={errors.speciality}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Специальность"
                        placeholder="Укажите специальность"
                        autoComplete="off"
                    />
                </div>
                <div>
                    <h2 className={css.header}>Работа</h2>
                    <Input
                        type="text"
                        value={values.job}
                        name="job"
                        handleError={errors.job}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Место работы"
                        placeholder="Укажите место работы"
                        autoComplete="off"
                    />
                    <Input
                        maxLength="500"
                        type="textarea"
                        value={values.jobTitle}
                        name="jobTitle"
                        handleError={errors.jobTitle}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Должность"
                        placeholder="Укажите должность"
                        autoComplete="off"
                    />
                </div>
                <div className={css.res_message}>
                    <label>{success?.message}</label>
                </div>
                <Button style={{ width: '100%' }} type="submit">
                    {' '}
                    Сохранить
                </Button>
            </form>
        </section>
    );
};
