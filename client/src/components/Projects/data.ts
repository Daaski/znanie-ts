import { v4 } from 'uuid';

interface LinkPropsType {
    href: string;
    name: string;
    description: string;
    img: string;
}

export const ProjectLinksData: LinkPropsType[] = [
    {
        href: 'premia.znanie',
        name: 'Премия «Знание»',
        description:
            'Премия российского общества «Знание» учреждена для признания достижений российских деятелей просвещения – преподавателей, лекторов, школьных учителей, блогеров, компаний, СМИ и других людей и проектов из разных областей, ведущих просветительскую деятельность.',
        img: '/images/PremiaZnanie/cube.jpeg',
    },
];
