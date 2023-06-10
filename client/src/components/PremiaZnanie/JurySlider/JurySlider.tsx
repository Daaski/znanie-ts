import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';

import HonorArrow from './icons/honorjuryArrow.svg';
import jury from 'dataTemporary/lectorsData';
import slickSettings from './settings';

import 'slick-carousel/slick/slick-theme.scss';
import 'slick-carousel/slick/slick.scss';
import css from './JurySlider.module.scss';

export const JurySlider = () => {
    const settings = slickSettings;
    return (
        <section id={'lectorsData'} className={css.honorjury_layout}>
            <div className={css.honorjury}>
                <div className={css.honorjury_title_wrapper}>
                    <h2 className={css.honorjury_title}>почётное жюри 2023</h2>
                    <Link
                        href={'/lectors'}
                        className={css.honorjury_text_wrapper}
                    >
                        <p className={css.honorjury_text}>Смотреть все</p>
                        <HonorArrow className={css.honorjury_arrow} />
                    </Link>
                </div>
                <Slider className={css.honorjury_cards} {...settings}>
                    {jury.map((jury, index) => {
                        return (
                            index <= 3 && (
                                <div
                                    key={jury.id}
                                    className={css.honorjury_card}
                                >
                                    <div className={css.honorjury_card_img}>
                                        <Image
                                            style={{
                                                objectFit: 'cover',
                                                borderRadius: '50%',
                                            }}
                                            alt={'Фотография жюри'}
                                            src={jury.img}
                                            fill
                                        />
                                    </div>
                                    <h4 className={css.honorjury_card_title}>
                                        {jury.title}
                                    </h4>
                                    <p className={css.honorjury_card_text}>
                                        {jury.text}
                                    </p>
                                </div>
                            )
                        );
                    })}
                </Slider>
            </div>
        </section>
    );
};
