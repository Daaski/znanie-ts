import Link from 'next/link';
import Image from 'next/image';

import { LectorType } from 'http/types';

import css from './LectorItem.module.scss';

export const LectorItem = ({
    pk,
    name,
    surname,
    position,
    place,
    image,
}: LectorType) => {
    return (
        <Link href={`/lectors/${pk}`} className={css.lectors_slide}>
            <div className={css.lectors_slide_content}>
                <h3 className={css.lectors_slide_content_title}>
                    {name + ' ' + surname}
                </h3>
                <div className={css.lectors_slide_content_text}>
                    <p>{`${position} в ${place}`}</p>
                </div>
            </div>
            <div className={css.lectors_slide_img_wrapper}>
                <Image
                    className={css.lectors_slide_img}
                    fill
                    src={image}
                    alt="Изображение Лектора"
                />
            </div>
        </Link>
    );
};
