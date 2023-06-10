import { useRef } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper';

import { Button } from 'components/UI/Button';
import { NextButton } from './ArrowsButtons/NextButton/NextButton';
import { PrevButton } from './ArrowsButtons/PrevButton/PrevButton';
import { useResizeWidth } from 'helpers/useResizeWidth.ts';
import { LectorItem } from './LectorItem/index';
import Arrow from '/public/images/Arrows/simpleArrow.svg';
import { LectorType } from 'http/types';

import css from './Lectors.module.scss';
import 'swiper/scss';

interface LectorsProps {
    lectors: LectorType[];
}

export const Lectors = ({ lectors }: LectorsProps) => {
    const sliderRef = useRef<SwiperClass>();
    const { tabletBreak } = useResizeWidth();
    return (
        <section className={css.lectors_layout}>
            <div className={css.lectors_header}>
                <div className={css.lectors_header_link}>
                    <Link href="/lectors" className={css.lectors_header_title}>
                        Лекторы
                        <Arrow className={css.lectors_header_link_arrow} />
                    </Link>
                </div>
                <div className={css.lectors_header_panel}>
                    <div className={css.button_wrapper}>
                        <Button big={!tabletBreak} href="/become-lector">
                            Стать Лектором
                        </Button>
                    </div>
                    <div className={css.lectors_header_nav_wrapper}>
                        <PrevButton
                            onClick={() => sliderRef.current?.slidePrev()}
                        />
                        <NextButton
                            onClick={() => sliderRef.current?.slideNext()}
                        />
                    </div>
                </div>
            </div>
            <Swiper
                breakpoints={{
                    300: {
                        slidesPerView: 'auto',
                    },
                    769: {
                        slidesPerView: 3,
                    },
                    989: {
                        slidesPerView: 4,
                    },
                    1200: {
                        slidesPerView: 5,
                    },
                }}
                onInit={(slider) => (sliderRef.current = slider)}
            >
                {lectors?.map((lector, index) => (
                    <SwiperSlide
                        key={index}
                        className={css.lectors_slide_wrapper}
                    >
                        <LectorItem {...lector} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};
