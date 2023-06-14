import { NominationType } from 'components/PremiaZnanie/types/nomination';
import { v4 as uuidv4 } from 'uuid';

const data: NominationType[] = [
    {
        id: uuidv4(),
        img: '/images/PremiaZnanie/apply/sciencetechnology.svg',
        title: 'За вклад в просвещение в сфере «Наука и Технологии»',
        text: 'Номинация для просветительских проектов и просветителей, которые активно занимаются популяризацией науки, рассказывают о последних научных открытиях и достижениях, новых технологиях, а также сами занимаются научной деятельностью и развитием научно-технического потенциала страны.',
        items: [
            {
                id: uuidv4(),
                text: 'Просветитель года в сфере «Наука и Технологии»',
            },
            {
                id: uuidv4(),
                text: 'Лучший просветительский проект в сфере «Наука и Технологии»',
            },
        ],
    },
    {
        id: uuidv4(),
        img: '/images/PremiaZnanie/apply/artculture.svg',
        title: 'За вклад в просвещение в сфере «Культура и искусство»',
        text: 'Номинация, направленная на выявление и определение лучших просветительских проектов и просветителей, осуществляющих просветительскую деятельность, связанную с культурным наследием России, популяризацией творчества и искусства, а также историей культуры и искусства.',
        items: [
            {
                id: uuidv4(),
                text: 'Просветитель года в сфере «Культура и искусство»',
            },
            {
                id: uuidv4(),
                text: 'Лучший просветительский проект в сфере «Культура и искусство»',
            },
        ],
    },
    {
        id: uuidv4(),
        img: '/images/PremiaZnanie/apply/history.svg',
        title: 'За вклад в просвещение в сфере «История»',
        text: 'Номинация, учрежденная для признания достижений российских деятелей просвещения и просветительских проектов, которые ведут активную просветительскую деятельность, посвященную истории, сохранению исторической правды и борьбе с фейками, связанными с историей.',
        items: [
            { id: uuidv4(), text: 'Просветитель года в сфере «История»' },
            {
                id: uuidv4(),
                text: 'Лучший просветительский проект в сфере «История»',
            },
        ],
    },
    {
        id: uuidv4(),
        img: '/images/PremiaZnanie/apply/economybuisiness.svg',
        title: 'За вклад в просвещение в сфере «ЭКОНОМИКА И Бизнес»',
        text: 'Номинация для просветительских проектов и просветителей, ведущих активную просветительскую деятельность, связанную с финансовой и инвестиционной грамотностью, предпринимательством и развитием предпринимательских способностей, а также с перспективами развития экономики.',
        items: [
            {
                id: uuidv4(),
                text: 'Просветитель года в сфере «Экономика и Бизнес»',
            },
            {
                id: uuidv4(),
                text: 'Лучший просветительский проект в сфере «Экономика и Бизнес»',
            },
        ],
    },
    {
        id: uuidv4(),
        img: '/images/PremiaZnanie/apply/newhorizon.svg',
        title: 'За вклад в просвещение в сфере  «Новые Горизонты»',
        text: 'Номинация для просветительских проектов и просветителей, которые активно рассказывают о новых возможностях и перспективах в разных сферах, импортозамещении, геополитике и роли России в мире.',
        items: [
            {
                id: uuidv4(),
                text: 'Просветитель года в сфере «Новые Горизонты»',
            },
            {
                id: uuidv4(),
                text: 'Лучший просветительский проект в сфере «Новые Горизонты»',
            },
        ],
    },
    {
        id: uuidv4(),
        img: '/images/PremiaZnanie/apply/bestmovie.svg',
        title: 'За лучший просветительский фильм',
        text: 'Номинация, учрежденная для определения лучшего просветительского фильма вне зависимости от тематики, презентованного в 2022-2023 году.',
        items: [{ id: uuidv4(), text: 'Лучший просветительский фильм' }],
    },
    {
        id: uuidv4(),
        img: '/images/PremiaZnanie/apply/bestevent.svg',
        title: 'За лучший просветительское мероприятие',
        text: 'Номинация, учрежденная для выявления наиболее масштабных и значимых просветительских мероприятий вне зависимости от тематики, прошедших за 2022-2023 год.',
        items: [{ id: uuidv4(), text: 'Лучший просветительское мероприятие' }],
    },
    {
        id: uuidv4(),
        img: '/images/PremiaZnanie/apply/socialresponsibility.svg',
        title: 'За вклад в просвещение в сфере «Мы вместе»',
        text: 'В сфере благотворительности, волонтерской деятельности, патриотизма, сплоченности нации, экологического и нравственного воспитания, а также здорового образа жизни.',
        items: [
            { id: uuidv4(), text: 'Просветитель года в сфере «Мы вместе»' },
            {
                id: uuidv4(),
                text: 'Лучший просветительский проект в сфере «Мы вместе»',
            },
        ],
    },
];

export default data;