import React from 'react';

import { Input } from 'components/UI/Inputs/Input';
import { SecondPageProps } from 'components/BecomeLector/FirstPage/FirstPageTypes';
import { InputSelect } from 'components/UI/Inputs/InputSelect';
import { InputMask } from 'components/UI/Inputs/InputMask';
import { Button } from 'components/UI/Button';
import { InputRadio } from 'components/UI/Inputs/InputRadio';

import css from './SecondPage.module.scss';

export const SecondPage = ({
    values,
    setFieldValue,
    setFieldTouched,
    touched,
    errors,
    handleBlur,
    user,
    handleChange,
    success,
}: SecondPageProps) => {
    return (
        <div className={css.second_page_form}>
            <div>
                <Input
                    disabled={!!user.email}
                    type="text"
                    value={values.email ? values.email : ''}
                    name="email"
                    handleError={touched.email ? errors.email : ''}
                    onBlur={handleBlur}
                    onChange={({ target: { value } }) => {
                        setFieldTouched('email', true);
                        setFieldValue('email', value);
                    }}
                    label="Email"
                    placeholder="Укажите ваш email*"
                />
                <div className={css.radio_wrapper}>
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
                </div>
            </div>
            <div>
                <h2 className={css.header}>Образование</h2>
                <InputSelect
                    which="univer/"
                    autoComplete="off"
                    type="text"
                    value={values.education}
                    handleError={touched.education && errors.education}
                    name="education"
                    onBlur={handleBlur}
                    onChange={(v: { id?: number; name: string }) =>
                        setFieldValue('education', v)
                    }
                    label="Укажите ВУЗ*"
                    dropdownName="ВУЗа"
                    placeholder="Выберите ВУЗ"
                />
                <InputMask
                    onChange={(v: string) => setFieldValue('educationEnd', v)}
                    alwaysShowMask={false}
                    maskPlaceholder={''}
                    mask="9999"
                    placeholder="Укажите год окончания*"
                    label="Год окончания*"
                    type="text"
                    value={values.educationEnd}
                    name="educationEnd"
                    handleError={touched.educationEnd && errors.educationEnd}
                    onBlur={handleBlur}
                    autoComplete="off"
                />
                <Input
                    type="text"
                    value={values.speciality}
                    name="speciality"
                    handleError={touched.speciality && errors.speciality}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Специальность*"
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
                    handleError={touched.job && errors.job}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Место работы*"
                    placeholder="Укажите место работы"
                    autoComplete="off"
                />
                <Input
                    maxLength="500"
                    type="textarea"
                    value={values.jobTitle}
                    name="jobTitle"
                    handleError={touched.jobTitle && errors.jobTitle}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Должность*"
                    placeholder="Укажите должность"
                    autoComplete="off"
                />
            </div>
            <div className={css.res_message}>
                <label>{success?.message}</label>
            </div>
            <Button style={{ width: '100%' }} type="submit">
                Стать лектором
            </Button>
        </div>
    );
};
