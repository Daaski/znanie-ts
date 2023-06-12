import { v4 as uuidv4 } from 'uuid';

interface PartnerType {
    id: string;
    src: string;
}

const data: PartnerType[] = [
    {
        id: uuidv4(),
        src: '/images/PremiaZnanie/countryvozmojno.png',
    },
    {
        id: uuidv4(),
        src: '/images/PremiaZnanie/drugoedelo.png',
    },
    {
        id: uuidv4(),
        src: '/images/PremiaZnanie/vk.png',
    },
    {
        id: uuidv4(),
        src: '/images/PremiaZnanie/rosiatele.png',
    },
    {
        id: uuidv4(),
        src: '/images/PremiaZnanie/bigbreak.png',
    },
    {
        id: uuidv4(),
        src: '/images/PremiaZnanie/shkolkini.png',
    },
    {
        id: uuidv4(),
        src: '/images/PremiaZnanie/mailgroup.png',
    },
    {
        id: uuidv4(),
        src: '/images/PremiaZnanie/rosmolodej.png',
    },
];

export default data;
