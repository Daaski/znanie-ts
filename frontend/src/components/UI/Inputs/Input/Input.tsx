import React, { ChangeEventHandler, useState } from 'react';

import { InputProps } from 'components/UI/Inputs/Input/Input.types';
import ShowedEye from 'components/LoginModal/Login/Forms/Icons/passShow.svg';
import UnShowedEye from 'components/LoginModal/Login/Forms/Icons/passUnshow.svg';

import css from './Input.module.scss';

export const Input: React.FC<InputProps> = ({
    type,
    placeholder,
    autoFocus,
    value,
    name,
    handleError,
    onChange,
    onBlur,
    label,
    style,
    autoComplete,
    maxLength,
    disabled,
}) => {
    const [showPass, setShowPass] = useState(false);

    return (
        <div
            style={style}
            className={type === 'textarea' ? css.field_textarea : css.field}
        >
            <div className={css.input_wrapper}>
                <label htmlFor={name} className={css.label}>
                    {label}
                </label>
                {type === 'textarea' ? (
                    <>
                        <textarea
                            maxLength={maxLength ? +maxLength : undefined}
                            className={
                                handleError
                                    ? css.input_textarea_error
                                    : css.input_textarea
                            }
                            onChange={
                                onChange as ChangeEventHandler<HTMLTextAreaElement>
                            }
                            value={value}
                            autoFocus={autoFocus}
                            id={name}
                            name={name}
                            placeholder={placeholder}
                            onBlur={onBlur}
                            disabled={disabled}
                        />
                        <label className={css.textarea_length}>
                            {value?.length ?? 0}/{maxLength}
                        </label>
                    </>
                ) : (
                    <input
                        autoComplete={autoComplete as string}
                        className={handleError ? css.input_error : css.input}
                        type="text"
                        onChange={
                            onChange as ChangeEventHandler<HTMLInputElement>
                        }
                        value={value}
                        autoFocus={autoFocus}
                        id={name}
                        name={name}
                        placeholder={placeholder}
                        onBlur={onBlur}
                        disabled={disabled}
                    />
                )}

                {type === 'password' && (
                    <div
                        onClick={() => setShowPass(!showPass)}
                        className={css.pass_img}
                    >
                        {!showPass ? (
                            <ShowedEye />
                        ) : (
                            <UnShowedEye style={{ marginTop: '2px' }} />
                        )}
                    </div>
                )}
            </div>
            {handleError && (
                <label className={css.input_error_label}>{handleError}</label>
            )}
        </div>
    );
};
