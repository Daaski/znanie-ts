import Image from 'next/image';
import Link from 'next/link';

import { LectorType } from 'http/types';

import css from './LectorItem.module.scss';

export const LectorItem = ({
    image,
    name,
    surname,
    position,
    place,
    pk,
}: LectorType) => {
    return (
        <div className={css.lectors_card}>
            <Link
                href={`lectors/${pk}`}
                className={css.lectors_card_img_wrapper}
            >
                <Image
                    className={css.lectors_card_img}
                    alt={'Фотография Лектора'}
                    src={image}
                    fill
                />
            </Link>
            <Link
                href={`lectors/${pk}`}
                className={css.lectors_card_title_wrapper}
            >
                <h4>
                    {surname} {name}
                </h4>
            </Link>
            <div className={css.lectors_card_text_wrapper}>
                <p
                    className={css.lectors_card_text}
                >{`${position} в ${place}`}</p>
            </div>
        </div>
    );
};
