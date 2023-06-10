import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { LectorItem } from 'components/Lectors/LectorItem';
import { RU_arr } from 'components/Lectors/RU_arr';
import { getFilterLectors } from 'http/lectorsApi';
import { removeQueryParam } from 'helpers/removeQueryParams';
import { LectorType } from 'http/types';

import css from './Lectors.module.scss';
import NProgress from 'nprogress';
import { Spinner } from 'components/UI/Spinner/Spinner';

interface LectorsProps {
    lectors: LectorType[];
}

export const Lectors = ({ lectors }: LectorsProps) => {
    const router = useRouter();
    const [filterLetter, setFilterLetter] = useState('А');
    const filterRef = useRef<HTMLDivElement>();

    useEffect(() => {
        if (!lectors.length) {
            NProgress.start();
        }
        NProgress.done();
    }, [lectors]);

    const handleFilterClick = (letter) => {
        router.replace({
            query: {
                ...router.query,
                surname: letter,
            },
        });
        setFilterLetter(letter);
    };

    return (
        <div className={css.lectors_wrapper}>
            <h1 className={css.lectors_title}>Лекторы Знания</h1>
            <div className={css.lectors_content}>
                <div
                    ref={filterRef as null}
                    className={css.lectors_filter_wrapper}
                >
                    <ul className={css.lectors_filter}>
                        {RU_arr.map((letter, index) => (
                            <div
                                onClick={() => handleFilterClick(letter)}
                                key={index}
                                className={css.filter_letter_wrapper}
                            >
                                <button
                                    className={
                                        filterLetter === letter
                                            ? css.filter_letter_active
                                            : css.filter_letter
                                    }
                                >
                                    {letter}
                                </button>
                            </div>
                        ))}
                    </ul>
                </div>
                <main className={css.lectors_cards}>
                    <h2 className={css.lectors_letter}>{filterLetter}</h2>
                    {lectors?.length !== 0 &&
                        lectors?.map((lector) => {
                            if (lector.surname.startsWith(filterLetter)) {
                                return (
                                    <LectorItem key={lector.pk} {...lector} />
                                );
                            }
                        })}
                </main>
            </div>
        </div>
    );
};
