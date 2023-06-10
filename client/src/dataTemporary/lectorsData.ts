import { v4 as uuidv4 } from 'uuid';

import { LectorType } from '/lib/types/lectors';

const lectorsData: LectorType[] = [
    {
        id: uuidv4(),
        title: 'Древаль Максим',
        text: 'Генеральный директор Российского общества «Знание»',
        img: '/images/Lectors/dreval.png',
    },
    {
        id: uuidv4(),
        title: 'Дуда Вадим',
        text: 'Генеральный директор ФГБУ «Российская государственная библиотека»',
        img: '/images/Lectors/duda.png',
    },
    {
        id: uuidv4(),
        title: 'Кропачев Николай',
        text: 'Ректор Санкт-Петербургского государственного университета, член-корреспондент РАН',
        img: '/images/Lectors/kropachev.png',
    },
    {
        id: uuidv4(),
        title: 'Проничева Елена',
        text: 'Генеральный директор ФГБУК «Политехнический музей»',
        img: '/images/Lectors/pronicheva.png',
    },
    {
        id: uuidv4(),
        title: 'Кабышев Сергей',
        text: 'Председатель комитета Государственной Думы по науке и высшему образованию',
        img: '/images/Lectors/kabishev.png',
    },
];

export default lectorsData;
