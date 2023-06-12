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
    return (startDate &&
        endDate &&
        startDate?.getTime() < day.getTime() &&
        day?.getTime() < endDate?.getTime()) as boolean;
};

export const checkStartDay: checkType = (startDate, endDate, day) => {
    return (endDate?.getTime() &&
        startDate?.getTime() === day?.getTime()) as boolean;
};

export const checkEndDay: checkType = (startDate, endDate, day) => {
    return (endDate?.getTime() &&
        endDate?.getTime() === day?.getTime()) as boolean;
};
