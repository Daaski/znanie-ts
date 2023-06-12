import { FC } from 'react';
import Link from 'next/link';

import Arrow from '/public/images/Arrows/circleArrow.svg';
import { IServiceType } from './Services.types';

import css from './Services.module.scss';

export const ServiceItem: FC<IServiceType> = ({
    img,
    href,
    gradient,
    title,
}) => {
    return (
        <Link href={href} className={css.grid_cell}>
            <div className={css.grid_content}>
                <h2 className={css.grid_title}>{title}</h2>
                <Arrow className={css.grid_arrow} />
            </div>
            <div
                style={{
                    background: `50%/cover no-repeat url(${img}), linear-gradient(${gradient})`,
                }}
                className={css.grid_img}
            />
        </Link>
    );
};
