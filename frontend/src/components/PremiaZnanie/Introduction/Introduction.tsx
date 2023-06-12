import Image from 'next/image';
import Link from 'next/link';

import MenuSvg from './icons/menu.svg';
import logo from '/public/images/PremiaZnanie/znanielogo.png';
import css from './Introduction.module.scss';
import React from 'react';

interface IIntroductionProps {
    menuVisible: boolean;
    setMenuVisible: (b: boolean) => void;
}

export const Introduction: React.FC<IIntroductionProps> = ({
    menuVisible,
    setMenuVisible,
}) => {
    const openMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <section className={css.introduction_wrapper}>
            <video className={css.introduction_video} autoPlay muted loop>
                <source
                    src={'/videos/PremiaZnanie/awards.mp4'}
                    type="video/mp4"
                />
            </video>
            <div className={css.introduction}>
                <div className={css.introduction_header}>
                    <Link href={'/'} className={css.introduction_znanielogo}>
                        <Image src={logo} alt={'Логотип'} />
                    </Link>

                    <MenuSvg
                        onClick={openMenu}
                        className={css.introduction_menu}
                    />
                </div>
                <div className={css.introduction_request}>
                    <p className={css.introduction_request_info}>
                        Подача заявок до 18 июля
                    </p>
                    <h1 className={css.introduction_request_award}>
                        Премия «знание»
                        <br /> 2023
                    </h1>
                    <button className={css.introduction_request_button}>
                        <p>Подать заявку</p>
                    </button>
                </div>
            </div>
        </section>
    );
};
