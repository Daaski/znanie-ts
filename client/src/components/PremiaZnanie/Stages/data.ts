import { StageType } from 'components/PremiaZnanie/types/stages.ts';
import { v4 as uuidv4 } from 'uuid';

const data: StageType[] = [
    {
        id: uuidv4(),
        range: '1 мая - 17 июля',
        description: 'сбор Заявок',
    },
    {
        id: uuidv4(),
        range: '18 — 31 июля',
        description: 'отбор заявок экспертной комиссией',
    },
    {
        id: uuidv4(),
        range: '13 октября',
        description: ' Голосование жюри, очный питчинг номинантов',
    },
    {
        id: uuidv4(),
        range: '14 октября - 14 ноября',
        description: 'Народное онлайн-голосование',
    },
    {
        id: uuidv4(),
        range: '7 декабря',
        description: 'Торжественное награждение победителей',
    },
];

export default data;
