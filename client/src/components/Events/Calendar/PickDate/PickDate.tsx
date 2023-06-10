import { forwardRef, useEffect, useState } from 'react';

import CalendarSvg from 'components/UI/Inputs/InputDate/icons/Calendar.svg';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';

import css from './PickDate.module.scss';

type date = { month?: number; day?: number };

interface PickDateProps {
    start?: Date;
    setStart: ({}: date) => void;
    setEnd: ({}: date) => void;
}

export const PickDate = ({ start, setStart, setEnd }: PickDateProps) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    // eslint-disable-next-line react/display-name
    const CustomInput = forwardRef(({ value, onClick }, ref) => {
        let visibleValue = (value = value.replace(/\//g, '.')).trim();
        if (/-$/.test(value.trim())) {
            visibleValue = value.replace(/\//g, '.').replace(/-/g, '').trim();
        }
        return (
            <div onClick={onClick} className={css.custom_input} ref={ref}>
                <CalendarSvg className={css.custom_input_svg} />
                <button style={{ cursor: 'pointer' }}>
                    {visibleValue ? visibleValue : 'Другая дата'}
                </button>
            </div>
        );
    });

    return (
        <div className={css.date_picker_wrapper}>
            <DatePicker
                locale={ru}
                calendarClassName={css.another_date}
                isClearable={true}
                dateFormat="dd/MM"
                onChange={(e) => {
                    setStart(e[0]);
                    setEnd(e[1]);
                    onChange(e);
                }}
                popperClassName={css.popper_class}
                customInput={<CustomInput />}
                startDate={startDate}
                endDate={endDate}
                portalId="root"
                selectsRange
            />
        </div>
    );
};
