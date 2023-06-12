import css from './MainSlider.module.scss';
import React from 'react';

const appendDots = (dots: JSX.Element) => (
    <div>
        <ul> {dots} </ul>
    </div>
);

export const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
    appendDots,
    dotsClass: css.dots,
};
