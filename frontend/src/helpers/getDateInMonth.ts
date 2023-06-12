const daysOfWeek = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

export const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'октябрь',
    'Ноябрь',
    'Декабрь',
];

const currentDate = new Date();

type getDaysInMonthType = (
    month: number,
    year: number,
    day?: number
) => { day: number; dayOfWeek: string; month: number }[];

export const getDaysInMonth: getDaysInMonthType = (month, year, day = 1) => {
    const date = new Date(year, month, day);
    const days: {
        day: number;
        dayOfWeek: string;
        month: number;
    }[] = [];

    while (date.getMonth() === month) {
        days.push({
            day: new Date(date).getDate(),
            month: month,
            dayOfWeek: daysOfWeek[new Date(date).getDay()],
        });
        date.setDate(date.getDate() + 1);
    }

    return days;
};

export const getDaysInMonthWithIteration = (iteration: number) => {
    let iterated = 0;
    const days: {
        day: number;
        dayOfWeek: string;
        month: number;
    }[][] = [];
    while (iterated < iteration) {
        if (iterated === 0) {
            days.push(
                getDaysInMonth(
                    currentDate.getMonth() - 1,
                    currentDate.getFullYear(),
                    currentDate.getDate()
                )
            );
        } else {
            days.push(
                getDaysInMonth(
                    currentDate.getMonth() - 1 + iterated,
                    currentDate.getFullYear()
                )
            );
        }
        iterated += 1;
    }
    return days;
};
