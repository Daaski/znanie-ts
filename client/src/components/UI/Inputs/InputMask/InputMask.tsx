import Input from 'react-input-mask';
import React from 'react';

import { InputMaskProps } from 'components/UI/Inputs/InputMask/InputMask.types';

import css from './InputMask.module.scss';

export const InputMask = ({
    handleError,
    mask,
    alwaysShowMask,
    placeholder,
    autoFocus,
    value,
    name,
    onChange,
    onBlur,
    label,
    type,
    maskPlaceholder,
    autoComplete,
    disabled,
}: InputMaskProps) => {
    return (
        <div className={css.field}>
            <div className={css.input_wrapper}>
                <label htmlFor={name} className={css.label}>
                    {label}
                </label>
                <Input
                    disabled={disabled}
                    autoComplete={autoComplete}
                    maskPlaceholder={maskPlaceholder}
                    type={type}
                    className={handleError ? css.input_error : css.input}
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    alwaysShowMask={alwaysShowMask}
                    mask={mask}
                    autoFocus={autoFocus}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    onBlur={onBlur}
                />
            </div>
            {handleError && (
                <label className={css.input_error_label}>{handleError}</label>
            )}
        </div>
    );
};
