import React from 'react';
import Link from 'next/link';

import css from './Menu.module.scss';

interface IMenuProps {
    menuVisible: boolean;
    setMenuVisible: (b: boolean) => void;
}

export const Menu: React.FC<IMenuProps> = ({ menuVisible, setMenuVisible }) => {
    const onHide = () => {
        setMenuVisible(!menuVisible);
    };

    const onScroll: React.MouseEventHandler<HTMLUListElement> = (e) => {
        e.stopPropagation();
        setMenuVisible(!menuVisible);
    };

    return (
        <div
            onClick={onHide}
            className={menuVisible ? css.menu_background : css.menu_disabled}
        >
            <ul onClick={onScroll} className={css.menu}>
                <Link href={'#whoCan'} className={css.menu_item}>
                    Кто может номинироваться
                </Link>
                <Link href={'#info'} className={css.menu_item}>
                    О премии
                </Link>
                <Link href={'#nominations'} className={css.menu_item}>
                    Подать заявку
                </Link>
                <Link href={'#stages'} className={css.menu_item}>
                    Этапы конкурса
                </Link>
                <Link href={'#index.tsx'} className={css.menu_item}>
                    Почетное жюри
                </Link>
                <Link href={'#memories'} className={css.menu_item}>
                    Как это было в 2021 году
                </Link>
            </ul>
        </div>
    );
};
