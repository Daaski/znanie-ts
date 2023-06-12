import Slider from 'react-slick';

import { SlidesData } from './data';
import { BigEventItem } from 'components/UI/Events/BigEventItem';
import { settings } from './settings';

import 'slick-carousel/slick/slick-theme.scss';
import 'slick-carousel/slick/slick.scss';
import css from './MainSlider.module.scss';

export const MainSlider = () => {
    return (
        <section className={css.main_slider}>
            <Slider {...settings}>
                {SlidesData.map((slide, index) => (
                    <BigEventItem key={index} {...slide} id={index} alt="" />
                ))}
            </Slider>
        </section>
    );
};
