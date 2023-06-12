import Image from 'next/image';

import partners from './data';

import css from './Partners.module.scss';

export const Partners = () => {
    return (
        <div className={css.partners_layout}>
            <div className={css.partners}>
                <h2 className={css.partners_title}>партнеры</h2>
                <ul className={css.partners_cards}>
                    {partners.map((partner, index) => (
                        <li className={css.partners_card} key={index}>
                            <span className={css.partners_card_img}>
                                <Image
                                    alt={'Логотип партнёра'}
                                    src={partner.src}
                                    fill
                                />
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
