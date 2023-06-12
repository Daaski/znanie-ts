import React, { useEffect, useState } from 'react';
import { motion, MotionValue } from 'framer-motion';

import Exit from 'components/Header/Menu/icons/Escape.svg';
import { getEventsPlaces } from 'http/placesApi';

import css from './InputAddress.module.scss';

type SetSubjectType = { pk: number; name: string };

interface InputDropdownProps {
    opacity: MotionValue;
    setVisible: (v: boolean) => void;
    setSubject: (object: SetSubjectType) => void;
    clear: boolean;
    setClear: (v: boolean) => void;
}

export const InputDropdown = ({
    opacity,
    setVisible,
    setSubject,
    clear,
    setClear,
}: InputDropdownProps) => {
    const [value, setValue] = useState<string>('');
    const [searchResult, setSearchResult] = useState<
        {
            pk: number;
            subject: string;
        }[]
    >([]);

    useEffect(() => {
        if (clear) {
            setValue('');
            setClear(false);
        }
    }, [clear, setClear]);

    return (
        <motion.div style={{ opacity }} className={css.input_dropdown_wrapper}>
            <div className={css.input_dropdown_content}>
                <div className={css.input_dropdown_content_search}>
                    <div className={css.input_dropdown_header}>
                        <h2 className={css.dropdown_header_title}>
                            Выберите регион
                        </h2>
                        <Exit
                            onClick={() => setVisible(false)}
                            className={css.header_exit}
                        />
                    </div>
                    <input
                        autoComplete="off"
                        type="text"
                        className={css.input}
                        onChange={(e) => {
                            setValue(e.target.value);
                            getEventsPlaces(e.target.value).then((r) =>
                                setSearchResult(r)
                            );
                        }}
                        value={value}
                        placeholder="Регион, город, населённый пункт"
                    />
                    {value && (
                        <Exit
                            onClick={() => {
                                setValue('');
                                setSubject({ pk: 0, name: '' });
                            }}
                            className={css.clear_input_button}
                        />
                    )}
                </div>
                <div className={css.search_list}>
                    {value && searchResult.length !== 0 ? (
                        searchResult.map((res, index) => (
                            <h3
                                onClick={() => {
                                    setSubject({
                                        pk: res.pk,
                                        name: res.subject,
                                    });
                                    setValue(res.subject);
                                    setVisible(false);
                                }}
                                className={css.search_list_item}
                                key={index}
                            >
                                {res.subject}
                            </h3>
                        ))
                    ) : value && searchResult?.length === 0 ? (
                        <p className={css.start_text}>
                            Мероприятия в этом регионе нет
                        </p>
                    ) : (
                        <p className={css.start_text}>
                            Введите в поле текст, чтобы увидеть результаты
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
