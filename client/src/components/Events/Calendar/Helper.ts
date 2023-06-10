type checkType = (
    startDate: Date | undefined,
    endDate: Date | undefined,
    selectedDay: Date
) => boolean;

export const checkActive: checkType = (startDate, endDate, selectedDay) => {
    return (
        startDate?.getTime() === selectedDay.getTime() ||
        endDate?.getTime() === selectedDay.getTime()
    );
};

export const checkPassive: checkType = (startDate, endDate, day) => {
    return (
        startDate?.getTime() < day.getTime() &&
        day?.getTime() < endDate?.getTime()
    );
};

export const checkStartDay: (startDate, endDate, day) => boolean = (
    startDate,
    endDate,
    day
) => {
    return endDate?.getTime() && startDate?.getTime() === day?.getTime();
};

export const checkEndDay: (startDate, endDate, day) => boolean = (
    startDate,
    endDate,
    day
) => {
    return endDate?.getTime() && endDate?.getTime() === day?.getTime();
};
