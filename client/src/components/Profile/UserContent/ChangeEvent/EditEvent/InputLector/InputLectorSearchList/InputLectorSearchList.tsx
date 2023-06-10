import { LectorType } from 'http/types';

import css from './InputLectorSearchList.module.scss';
import Image from 'next/image';

interface InputLectorSearchListProps {
    probableLectors: Omit<LectorType, 'place' | 'position'>[];
    onClick: (v: Omit<LectorType, 'place' | 'position'>[]) => void;
    lectors: Omit<LectorType, 'place' | 'position'>[];
    setVisible: (b: boolean) => void;
    dropdownName: string;
}

export const InputLectorSearchList = ({
    probableLectors,
    onClick,
    setVisible,
    lectors,
    dropdownName,
}: InputLectorSearchListProps) => {
    return (
        <div className={css.searchlist_container}>
            <div className={css.searchlist_wrapper}>
                <ul className={css.searchlist}>
                    {probableLectors.length ? (
                        probableLectors?.map((lector, index) => {
                            if (index < 9)
                                return (
                                    <li
                                        onClick={() => {
                                            onClick([
                                                ...lectors,
                                                {
                                                    pk: lector.pk,
                                                    name: lector.name,
                                                    surname: lector.surname,
                                                    image: lector.image,
                                                },
                                            ]);
                                            setVisible(false);
                                        }}
                                        key={index}
                                        className={css.searchlist_item}
                                    >
                                        <div
                                            className={
                                                css.searchlist_lector_image_wrapper
                                            }
                                        >
                                            <Image
                                                fill
                                                className={
                                                    css.searchlist_lector_image
                                                }
                                                src={lector.image}
                                                alt={lector.name}
                                            />
                                        </div>
                                        <p className={css.searchlist_item_text}>
                                            {`${lector.name} ${lector.surname}`}
                                        </p>
                                    </li>
                                );
                        })
                    ) : (
                        <p className={css.no_such_places}>
                            Начните вводить название {dropdownName}
                        </p>
                    )}
                </ul>
            </div>
        </div>
    );
};
