import { FC } from 'react';
import Link from 'next/link';

import { BecomeLinkPropsType } from 'components/Header/LinksWrappers/Links.types.ts';

import css from './BecomeLinks.module.scss';
import { useUserStore } from 'store/UserStore';
import { useModalVisible } from 'store/ModalVisible';

export const BecomeItem: FC<BecomeLinkPropsType> = ({
    img,
    description,
    href,
    setVisible,
}) => {
    const [user] = useUserStore((state) => [state.user]);
    const [setModalVisible] = useModalVisible((state) => [
        state.setModalVisible,
    ]);

    if (user.role === 'lector' && description === 'Стать лектором') {
        return null;
    }

    if (user.isAuth && description === 'Стать членом роз') {
        return null;
    }

    if (description === 'Стать членом роз') {
        return (
            <li
                onClick={() => {
                    setVisible ? setVisible(false) : '';
                    setModalVisible(true);
                }}
                className={css.dropdown_item_wrapper}
            >
                <div className={css.dropdown_item}>
                    <div className={css.dropdown_img_wrapper}>{img}</div>
                    <p className={css.dropdown_text}>{description}</p>
                </div>
            </li>
        );
    }

    return (
        <li className={css.dropdown_item_wrapper}>
            <Link className={css.dropdown_item} href={href}>
                <div className={css.dropdown_img_wrapper}>{img}</div>
                <p className={css.dropdown_text}>{description}</p>
            </Link>
        </li>
    );
};
