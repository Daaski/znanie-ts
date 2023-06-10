import React, { useRef, useEffect } from 'react';

import * as T from 'components/LoginModal/Login/Forms/CheckingPinForm/CheckingPinForm.types';

import css from 'components/LoginModal/Login/Forms/CheckingPinForm/CheckingPinForm.module.scss';

export default function PinCodeInput({
    digits,
    changeHandler,
    errors,
}: T.IPinCodeInputProps) {
    const length = digits.length;
    // здесь будут ссылки на input-элементы
    const inputRefs = useRef([]);

    useEffect(() => {
        inputRefs.current[0].focus();
    }, []);

    const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace') {
            event.preventDefault();
            if (digits[index].match(/^[0-9]$/)) {
                // если элемент массива digits содержит цифру, то при нажатии клавиши
                // вызываем callback-функцию родителя, чтобы записать пустую строку
                const newDigits = [...digits]; // копия digits
                newDigits[index] = '';
                changeHandler(newDigits);
                if (index > 0) inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleChange = (index, newValue) => {
        const oldDigit = digits[index];
        // старую цифру в поле ввода убираем, оставляя только новую
        const newDigit = newValue.trim().replace(oldDigit, '');
        // если это не цифра, ничего не делаем, пока не будет цифры
        if (newDigit < '0' || newDigit > '9') return;
        // теперь вызываем callback родителя, чтобы обовить digits
        const newDigits = [...digits]; // копия digits
        newDigits[index] = newDigit;
        changeHandler(newDigits);
        // смещаем фокус на следующее поле для ввода следующей цифры
        if (index < length - 1) {
            inputRefs.current[index + 1].focus();
        } else {
            // или убираем фокус, если это было последнее поле
            inputRefs.current[index].blur();
        }
    };

    return (
        <div className={css.pin_code_input_wrapper}>
            <div className={css.inputs_wrapper}>
                {digits.map((digit, index) => (
                    <input
                        key={index}
                        className={
                            errors.code ? css.input_cell_error : css.input_cell
                        }
                        value={digit}
                        onChange={(event) =>
                            handleChange(index, event.target.value)
                        }
                        onKeyDown={(event) => handleKeyDown(index, event)}
                        ref={(element) => (inputRefs.current[index] = element)}
                    />
                ))}
            </div>
            {errors.code && (
                <label
                    style={{ textAlign: 'center' }}
                    className={css.form_input_error_label}
                >
                    {errors.code}
                </label>
            )}
        </div>
    );
}
