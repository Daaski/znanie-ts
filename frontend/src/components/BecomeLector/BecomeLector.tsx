import Image from 'next/image';
import React, { memo, useState } from 'react';
import { useRouter } from 'next/router';

import { FirstPage } from 'components/BecomeLector/FirstPage';
import { IUser } from 'store/types/userStore.types';
import becomeLectorImg from '/public/images/BecomeLector/becomeLector.png';
import { useFormik } from 'formik';
import * as T from './BecomeLector.types';
import { SecondPage } from 'components/BecomeLector/SecondPage';
import { BecomeLectorsValidate } from 'components/BecomeLector/BecomeLectors.utils';
import Arrow from '/public/images/Arrows/rayArrow.svg';
import { becomeLector, updateUser } from 'http/userApi';

import css from './BecomeLector.module.scss';

interface IBecomeLectorProps {
    user: IUser;
    setUser: (user: IUser) => void;
}

export const BecomeLector = memo(function BecomeLector({
    user,
    setUser,
}: IBecomeLectorProps) {
    const [page, setPage] = useState(1);
    const [success, setSuccess] = useState({ success: false, message: '' });
    const router = useRouter();

    const onSubmit = (values: T.BecomeLectorTypes) => {
        try {
            updateUser(
                values.surname,
                values.name,
                values.patronymic,
                JSON.stringify(values.birthdate).slice(1, 11),
                values.gender,
                values.address.id as number,
                values.email,
                {
                    place: values.education.id as number,
                    graduated_year: values.educationEnd,
                    major: values.speciality,
                },
                { place: values.job, position: values.jobTitle }
            ).then(() =>
                becomeLector(
                    values.name,
                    values.surname,
                    values.patronymic,
                    values.email,
                    JSON.stringify(values.birthdate).slice(1, 11)
                ).then((r) => setUser({ ...user, role: r.role }))
            );
            router.replace('/').then();
            setSuccess({ message: 'Данные успешно сохранены', success: true });
        } catch (e: any) {
            setSuccess({ message: e.message, success: false });
        }
    };

    const {
        values,
        errors,
        handleSubmit,
        touched,
        handleBlur,
        handleChange,
        setFieldValue,
        setFieldTouched,
    } = useFormik<T.BecomeLectorTypes>({
        initialValues: {
            email: user.email ?? '',
            surname: user.surname,
            name: user.name,
            gender: user.gender,
            patronymic: user.patronymic ?? '',
            address:
                user.addressId !== 0
                    ? {
                          id: user.addressId,
                          name: `${user.addressSubject}, г. ${user.addressName}`,
                      }
                    : { id: 0, name: '' },
            job: user.job,
            jobTitle: user.jobTitle,
            education: {
                id: +user.educationId ?? 0,
                name: user.education,
            },
            educationEnd: user.educationEnd,
            speciality: user.speciality,
            birthdate: new Date(user.birthday),
        },
        onSubmit,
        validate: BecomeLectorsValidate,
    });

    return (
        <main className={css.become_lector_container}>
            <div className={css.become_lector}>
                <div className={css.become_lector_wrapper}>
                    <div className={css.become_lector_header}>
                        <div className={css.title_with_arrow}>
                            {page > 1 && (
                                <Arrow
                                    onClick={() => setPage((page) => page - 1)}
                                    className={css.back_arrow}
                                />
                            )}
                            <h2 className={css.become_lector_header_title}>
                                Стать лектором
                            </h2>
                        </div>
                        <p className={css.become_lector_header_pages}>
                            {page}/2
                        </p>
                    </div>
                    <form
                        className={css.become_lector_form}
                        onSubmit={handleSubmit}
                    >
                        {page === 1 && (
                            <FirstPage
                                handleChange={handleChange}
                                setPage={setPage}
                                user={user}
                                touched={touched}
                                errors={errors}
                                handleBlur={handleBlur}
                                setFieldTouched={setFieldTouched}
                                setFieldValue={setFieldValue}
                                values={values}
                            />
                        )}
                        {page === 2 && (
                            <SecondPage
                                success={success}
                                user={user}
                                touched={touched}
                                handleChange={handleChange}
                                errors={errors}
                                handleBlur={handleBlur}
                                setFieldTouched={setFieldTouched}
                                setFieldValue={setFieldValue}
                                values={values}
                            />
                        )}
                    </form>
                </div>
                <div className={css.become_lector_image_wrapper}>
                    <span className={css.become_lector_image}>
                        <Image
                            priority={true}
                            fill
                            src={becomeLectorImg}
                            alt="Станьте Лектором"
                        />
                    </span>
                </div>
            </div>
        </main>
    );
});
