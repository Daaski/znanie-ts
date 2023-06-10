import Image from 'next/image';

import { LectorType } from 'lib/types/lectors';

import css from './Lector.module.scss';

export const Lector = ({
    place,
    position,
    surname,
    name,
    image,
}: LectorType) => {
    return (
        <main className={css.lector_container}>
            <div className={css.lector_wrapper}>
                <div className={css.lector_content}>
                    <div className={css.lector_img_wrapper}>
                        <Image
                            style={{ borderRadius: '15px' }}
                            fill
                            src={image}
                            alt={surname + ' ' + name}
                        />
                    </div>
                    <h3 className={css.lector_title}>
                        {surname} {name}
                    </h3>
                    <h3 className={css.lector_text}>
                        {position} в {place}
                    </h3>
                </div>
            </div>
        </main>
    );
};
