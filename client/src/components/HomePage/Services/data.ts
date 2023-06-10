import { v4 } from 'uuid';
import { IServiceType } from './Services.types';

export const ServicesList: IServiceType[] = [
    {
        id: v4(),
        title: 'Мероприятия',
        href: '/events',
        img: '/images/Home/services/events.png',
        gradient: '180deg, #6096d0, #cde5ff',
    },
    {
        id: v4(),
        title: 'Проекты',
        href: '/projects',
        img: '/images/Home/services/lectures.png',
        gradient: '180deg, #a9cd6d, #eaffc8',
    },
    {
        id: v4(),
        title: 'Стать лектором',
        href: '/become-lector',
        img: '/images/Home/services/become-speaker.png',
        gradient: '180deg, #f18f99, #ffc7cc',
    },
];
