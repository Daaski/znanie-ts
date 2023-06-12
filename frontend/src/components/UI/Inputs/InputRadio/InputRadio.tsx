import React from 'react';

import { InputRadioProps } from 'components/UI/Inputs/InputRadio/InputRadio.types';

import css from './InputRadio.module.scss';

export const InputRadio = ({
    name,
    label,
    type,
    value,
    chooseName,
    onChange,
    initialValue,
}: InputRadioProps) => {
    return (
        <div className={css.input_container}>
            <label>{label}</label>
            <div className={css.input_wrapper}>
                {value.map((val, index) => (
                    <label
                        className={
                            initialValue === val
                                ? css.pseudo_input_active
                                : css.pseudo_input
                        }
                        key={index}
                    >
                        <input
                            className={css.input}
                            onChange={({ target }) => {
                                onChange(target.value);
                            }}
                            name={name}
                            type={type}
                            value={val}
                            checked={initialValue === val}
                        />
                        <label className={css.input_description}>
                            {chooseName[index]}
                        </label>
                    </label>
                ))}
            </div>
        </div>
    );
};
