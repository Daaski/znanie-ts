import Image from 'next/image';
import React, { useState } from 'react';

import NominationArrow from './icons/nominationArrow.svg';
import { NominationType } from 'components/PremiaZnanie/types/nomination';

type INominationItemProps = NominationType;

import css from './Apply.module.scss';

export const NominationItem: React.FC<INominationItemProps> = ({
    img,
    items,
    title,
    text,
}) => {
    const [visible, setVisible] = useState(false);
    const changeVisible = () => {
        setVisible(!visible);
    };

    return (
        <div className={css.apply_awards_item_wrapper}>
            <div onClick={changeVisible} className={css.apply_awards_item}>
                <div className={css.apply_awards_item_header}>
                    <span className={css.apply_awards_item_img}>
                        <Image alt={'Изображение номинации'} src={img} fill />
                    </span>
                    <h4 className={css.apply_awards_item_title}>{title}</h4>
                </div>
                <div
                    className={
                        visible
                            ? css.apply_awards_item_description
                            : css.apply_disabled
                    }
                >
                    <p className={css.apply_awards_item_text}>{text}</p>
                    <ul className={css.apply_awards_item_list}>
                        {items.map((item) => (
                            <li
                                key={item.id}
                                className={css.apply_awards_item_list_item}
                            >
                                <NominationArrow
                                    className={css.apply_list_item_img}
                                />
                                <p>{item.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
