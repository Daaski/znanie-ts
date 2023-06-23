import React, { memo, useRef } from 'react';
import SwiperClass from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Arrow from '/public/images/Arrows/circleArrow.svg';
import { LectorItem } from 'components/Event/LectorItem';
import { useResizeWidth } from 'helpers/useResizeWidth';
import { LectorSwiperProps } from 'components/Event/Event.types';

import css from './LectorSwiper.module.scss'

export const LectorSwiper = memo(function LectorSwiper({event}: LectorSwiperProps) {
    const swiperRef = useRef<SwiperClass>();
    const {  semiTabletBreak } = useResizeWidth();

    return (
        <div className={css.lectors}>
            <div className={css.lectors_header}>
                <h2 className={css.lectors_header_title}>Лекторы</h2>
            </div>
            <div className={css.lectors_swiper_wrapper}>
                {!semiTabletBreak && (
                    <Arrow
                        className={css.lectors_slide_prev}
                        onClick={() => swiperRef.current?.slidePrev()}
                    />
                )}
                <Swiper
                    breakpoints={{
                        300: {
                            slidesPerView: 'auto',
                            initialSlide: 1,
                        },
                        500: {
                            slidesPerView: 2,
                            initialSlide: 1,
                        },
                        850: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1200: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                        },
                    }}
                    onInit={(swiper) => (swiperRef.current = swiper)}
                >
                    {event.lectors.map((lector, index) => (
                        <SwiperSlide
                            className={css.lector_slide_wrapper}
                            key={index}
                        >
                            <LectorItem {...lector} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                {!semiTabletBreak && (
                    <Arrow
                        className={css.lectors_slide_next}
                        onClick={() => swiperRef.current?.slideNext()}
                    />
                )}
            </div>
        </div>
    )
})