import { memo } from 'react';

import { InputCheckboxProps } from './InputCheckbox.types';

import css from './InputCheckbox.module.scss';

export const InputCheckbox = ({
    name,
    label,
    type,
    value,
    onChange,
}: InputCheckboxProps) => {
    return (
        <div className={css.input_container}>
            <div className={css.input_wrapper}>
                <label
                    htmlFor={name}
                    className={
                        value ? css.pseudo_input_active : css.pseudo_input
                    }
                >
                    <input
                        id={name}
                        className={css.input}
                        onChange={() => {
                            onChange(!value);
                        }}
                        name={name}
                        type={type}
                        checked={value}
                    />
                    <label className={css.input_description} htmlFor={name}>
                        {label}
                    </label>
                </label>
            </div>
        </div>
    );
};
