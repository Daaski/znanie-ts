import { v4 } from 'uuid';
import Lector from 'components/Header/icons/Lector.svg';
import Member from 'components/Header/icons/MemberROZ.svg';

export const BecomeLinksData: {
    id: string;
    href: string;
    description: string;
    img: JSX.Element;
}[] = [
    {
        id: v4(),
        href: '/become-lector',
        description: 'Стать лектором',
        img: <Lector />,
    },
    {
        id: v4(),
        href: '/',
        description: 'Стать членом роз',
        img: <Member />,
    },
];
