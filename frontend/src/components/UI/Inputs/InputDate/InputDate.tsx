import Input from 'react-input-mask';
import React from 'react';

import ru from 'date-fns/locale/ru';
import DatePicker from 'react-datepicker';
import { InputDateProps } from 'components/UI/Inputs/InputDate/InputDate.types';
import CalendarSvg from './icons/Calendar.svg';

import 'react-datepicker/dist/react-datepicker.css';
import css from 'components/UI/Inputs/InputDate/InputDate.module.scss';

export const InputDate = ({
    handleError,
    mask,
    alwaysShowMask,
    placeholder,
    value,
    name,
    onChange,
    onBlur,
    label,
    disabled,
}: InputDateProps) => {
    return (
        <div className={css.field}>
            <div onClick={onBlur} className={css.input_wrapper}>
                <label className={css.label}>{label}</label>
                <DatePicker
                    disabled={disabled}
                    locale={ru}
                    dateFormat="dd.MM.yyyy"
                    selected={value}
                    onChange={(date) => {
                        onChange(date as Date);
                    }}
                    calendarClassName={css.calendar}
                    customInput={
                        <Input
                            disabled={disabled}
                            className={
                                handleError ? css.input_error : css.input
                            }
                            mask={mask}
                            alwaysShowMask={alwaysShowMask}
                            id={name}
                            name={name}
                            placeholder={placeholder}
                            onBlur={onBlur}
                        />
                    }
                />
                <CalendarSvg className={css.calendar_svg} />
            </div>
            {handleError && (
                <label className={css.input_error_label}>{handleError}</label>
            )}
        </div>
    );
};
