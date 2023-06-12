import { useFormik } from 'formik';
import { Input } from 'components/UI/Inputs/Input';
import { EditEventValidate } from 'components/Profile/UserContent/ChangeEvent/EditEvent/EditEvent.utils';
import { SingleEventWithLectors } from 'http/types';
import { InputSelect } from 'components/UI/Inputs/InputSelect';
import { EditEventForm } from 'components/Profile/UserContent/ChangeEvent/EditEvent/EditEventTypes';
import { InputDate } from 'components/UI/Inputs/InputDate';
import { Button } from 'components/UI/Button';
import React, { useRef, useState } from 'react';
import { ImgModal } from 'components/UI/Modals/ImgModal';
import { useResizeWidth } from 'helpers/useResizeWidth';
import lectors from 'pages/lectors';
import NProgress from 'nprogress';
import {
    createEvent,
    createPermissionEvent,
    updateEvent,
} from 'http/eventsApi';
import { InputLector } from 'components/Profile/UserContent/ChangeEvent/EditEvent/InputLector';
import { useUserStore } from 'store/UserStore';

import css from './EditEvent.module.scss';

interface EditEventProps {
    mode: 'create' | 'edit';
    event: SingleEventWithLectors;
}

export const EditEvent = ({ mode, event }: EditEventProps) => {
    const [user] = useUserStore((state) => [state.user]);
    const [setUser] = useUserStore((state) => [state.setUser]);
    const [success, setSuccess] = useState<{
        message: string;
        success: boolean;
    }>();
    const inputRef = useRef(null);
    const { tabletBreak } = useResizeWidth();
    const [visible, setVisible] = useState(false);

    const onSubmit = async (values: EditEventForm) => {
        const lectors =
            values.lectors.length === 0
                ? [user.pk]
                : values.lectors.map((lector) => lector.pk);
        NProgress.start();
        if (mode === 'create') {
            await createEvent(
                values.name,
                values.about,
                values.description,
                values.start,
                values.end,
                JSON.stringify(values.address.id),
                values.image as File,
                lectors as string[]
            ).then((r) =>
                createPermissionEvent(r.pk)
                    .then((r) => {
                        setSuccess({ message: `Упешно!`, success: true });
                        setUser({ ...user, createdEvents: r });
                    })
                    .catch((e) =>
                        setSuccess({ message: e.message, success: false })
                    )
                    .finally(() => NProgress.done())
            );
        }
        if (mode === 'edit') {
            await updateEvent(
                event.pk,
                values.name,
                values.about,
                values.description,
                values.start,
                values.end,
                JSON.stringify(values.address.id),
                values.image as File,
                lectors as string[]
            )
                .then((r) =>
                    createPermissionEvent(r.pk)
                        .then((r) => {
                            setUser({ ...user, createdEvents: r });
                            setSuccess({ message: `Упешно!`, success: true });
                        })
                        .catch((e) =>
                            setSuccess({ message: e.message, success: false })
                        )
                )
                .finally(() => NProgress.done());
        }
    };

    const {
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        setFieldValue,
        setFieldTouched,
    } = useFormik<EditEventForm>({
        initialValues: {
            pk: event?.pk ?? 0,
            start: new Date(event?.start ?? Date.now()),
            end: new Date(event?.end ?? Date.now()),
            name: event?.name ?? '',
            address: {
                id: event?.pk ?? 0,
                name: event?.address
                    ? `${event.address.subject}, ${event.address.type} ${event.address.name}`
                    : '',
            },
            status: event?.status ?? 'new',
            image: event?.image ?? '',
            about: event?.about ?? '',
            description: event?.description ?? '',
            lectors: event?.lectors?.length
                ? event?.lectors.filter(
                      (lector) => +lector.pk !== +(user.pk as number)
                  )
                : [],
        },
        onSubmit,
        validate: EditEventValidate,
    });

    return (
        <form className={css.event_form_container} onSubmit={handleSubmit}>
            <div className={css.event_name}>
                <Input
                    placeholder="Название мероприятия"
                    type="text"
                    value={values.name}
                    name="name"
                    handleError={touched.name && errors.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Укажите название"
                />
            </div>
            <div className={css.event_description}>
                <div className={css.event_description_item}>
                    <Input
                        type="textarea"
                        value={values.about}
                        onChange={handleChange}
                        placeholder="Укажите небольшое описание меропрятия"
                        label="О мероприятии"
                        handleError={touched.about && errors.about}
                        name="about"
                        onBlur={handleBlur}
                        maxLength="200"
                    />
                </div>
                <div className={css.event_description_item}>
                    <Input
                        type="textarea"
                        value={values.description}
                        name="description"
                        handleError={touched.description && errors.description}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Полное описание мероприятия"
                        placeholder="Укажите подробное описание мероприятия"
                        maxLength="500"
                    />
                </div>
            </div>
            <InputSelect
                type="text"
                value={values.address}
                name="address"
                onBlur={handleBlur}
                onChange={(v: { id?: number; name: string }) => {
                    setFieldValue('address', v);
                }}
                label="Адрес"
                placeholder="Укажите город проводимого мероприятия"
                dropdownName="Населённого пункта"
                autoComplete="off"
                which="address/"
                handleError={touched.address && (errors.address as any)}
            />
            <InputDate
                value={values.start}
                onChange={(date: Date) => setFieldValue('start', date)}
                alwaysShowMask={true}
                label="Дата начала"
                name="start"
                onBlur={() => setFieldTouched('start', true)}
                placeholder={values.start?.toString()}
                mask="99.99.9999"
                type="text"
                handleError={touched.start && (errors.start as string)}
            />
            <InputDate
                value={values.end}
                onChange={(date: Date) => setFieldValue('end', date)}
                alwaysShowMask={true}
                mask="99.99.9999"
                placeholder={values.end?.toString()}
                label="Дата окончания"
                type="text"
                name="end"
                onBlur={() => setFieldTouched('start', true)}
                handleError={touched.end && (errors.end as string)}
            />
            <div className={css.form_input_lector}>
                <InputLector
                    lectors={values.lectors}
                    type="text"
                    onChange={(v) => {
                        setFieldValue('lectors', v);
                    }}
                    label="Выберите лекторов"
                    placeholder="Начните вводить имя лектора"
                    onBlur={handleBlur}
                    name="lectors"
                    handleError={touched.lectors && (errors.lectors as any)}
                    dropdownName="Лекторов"
                    autoComplete="off"
                />
                <p className={css.form_input_note}>
                    *Вы автоматически включены в этот список
                </p>
            </div>
            <div className={css.img_button_wrapper}>
                <Button
                    buttonType="primary"
                    handleClick={() => {
                        setFieldTouched('image', true);
                        setVisible(true);
                    }}
                    type="button"
                >
                    Выберите изображение
                </Button>
                {visible && (
                    <ImgModal
                        setVisible={setVisible}
                        handleChangeFile={(e) => {
                            setFieldValue('image', e.target.files?.item(0));
                            setVisible(false);
                        }}
                        ref={inputRef}
                        tabletBreak={tabletBreak}
                    />
                )}
                {typeof values.image !== 'string' && values.image?.name && (
                    <p className={css.image_name}>{values.image?.name}</p>
                )}
                {touched.image && errors.image && (
                    <label className={css.input_error_label}>
                        {errors.image}
                    </label>
                )}
            </div>
            {success?.success ? (
                <div className={css.res_message}>
                    <label>{success?.message}</label>
                </div>
            ) : (
                <div className={css.res_error}>
                    <label>{success?.message}</label>
                </div>
            )}
            <Button
                disabled={mode === 'create' && (success?.success as boolean)}
                type="submit"
            >
                {mode === 'create' ? 'Создать' : 'Сохранить'}
            </Button>
        </form>
    );
};
