import { v4 } from 'uuid';
import { ISlideType } from './MainSlider.types';

export const SlidesData: ISlideType[] = [
    {
        id: v4(),
        title: 'Знание.Премия 2023',
        description: 'Подай заявку на Просветительскую премию «Знание»',
        href: 'premia.znanie',
        backgroundImg: '/images/PremiaZnanie/znanieintroductionback.jpg',
        backgroundSrc: '/videos/PremiaZnanie/preview-premiaznanie.webm',
    },
    {
        id: v4(),
        title: '«Лига Лекторов»',
        description: 'Масштабный конкурс для просветителей',
        href: 'https://ligaznaniy-shkola.znanierussia.ru/',
        backgroundImg: '/images/LigaLectorov/poster.jpg',
        backgroundSrc: '/videos/LigaLectorov/preview-LigaLectorov.webm',
    },
    {
        id: v4(),
        title: '«Лига Знаний: школы и колледжи»',
        description:
            'Главный интеллектуальный турнир страны среди школ и колледжей!',
        href: 'https://znanierussia.ru/ligalektorov',
        backgroundImg: '/images/LeagueZnanie/preview/leagueZnanie.jpg',
        alt: 'Лига Знаний Фото',
    },
];
