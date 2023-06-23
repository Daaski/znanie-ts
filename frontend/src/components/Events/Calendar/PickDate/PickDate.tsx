import {
    forwardRef,
    MouseEventHandler,
    useState,
} from 'react';

import CalendarSvg from 'components/UI/Inputs/InputDate/icons/Calendar.svg';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';

import css from './PickDate.module.scss';


interface PickDateProps {
    start?: Date;
    setStart: (o: Date) => void;
    setEnd: (o: Date) => void;
}

export const PickDate = ({ setStart, setEnd }: PickDateProps) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const onChange = (dates: Date[]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    // eslint-disable-next-line react/display-name
    const CustomInput = forwardRef<
        HTMLDivElement,
        { value: string; onClick: MouseEventHandler<HTMLDivElement> }
    >(({ value, onClick }, ref) => {
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
                    setStart(e[0] as Date);

                    setEnd(e[1] as Date);
                    onChange(e as Date[]);
                }}
                popperClassName={css.popper_class}
                /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                // @ts-ignore
                customInput={<CustomInput />}
                startDate={startDate}
                endDate={endDate}
                portalId="root"
                selectsRange
            />
        </div>
    );
};
