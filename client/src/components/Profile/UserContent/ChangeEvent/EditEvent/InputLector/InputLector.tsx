import React, { useState } from 'react';
import Image from 'next/image';

import { InputLectorSearchList } from 'components/Profile/UserContent/ChangeEvent/EditEvent/InputLector/InputLectorSearchList';
import { getFilterLectorsFullName } from 'http/lectorsApi';
import { InputSelectProps } from 'components/UI/Inputs/InputSelect/InputSelect.types';
import { FormikErrors } from 'formik';
import { LectorType } from 'http/types';
import Exit from 'components/Header/Menu/icons/Escape.svg';
import Tippy from '@tippyjs/react/headless';

import css from './InputLector.module.scss';

interface InputLectorProps
    extends Omit<
        InputSelectProps,
        'value' | 'onChange' | 'handleError' | 'which' | 'disabled'
    > {
    handleError: FormikErrors<Omit<LectorType, 'place' | 'position'>>;
    lectors: Omit<LectorType, 'place' | 'position'>[];
    onChange: (v: Omit<LectorType, 'place' | 'position'>[]) => void;
}

export const InputLector = ({
    lectors,
    type,
    placeholder,
    name,
    onChange,
    onBlur,
    label,
    dropdownName,
    autoComplete,
    handleError,
}: InputLectorProps) => {
    const [value, setValue] = useState('');
    const [visible, setVisible] = useState(false);
    const [probableLectors, setProbableLectors] = useState<
        Omit<LectorType, 'place' | 'position'>[]
    >([]);

    const handleSearchChange = (e) => {
        setValue(e.target.value);
        setVisible(true);
        getFilterLectorsFullName(e.target.value).then((r) =>
            setProbableLectors(r)
        );
    };

    const onClickOutside = () => {
        setVisible(false);
        setValue('');
    };

    const handleDeleteLector = (pk: string) => {
        onChange(lectors.filter((lector) => lector.pk !== pk));
    };

    return (
        <>
            <div className={css.field}>
                <div className={css.input_wrapper}>
                    <label htmlFor={name} className={css.label}>
                        {label}
                    </label>
                    <Tippy
                        visible={visible}
                        interactive={true}
                        placement="bottom"
                        onClickOutside={onClickOutside}
                        render={() => (
                            <InputLectorSearchList
                                lectors={lectors}
                                dropdownName={dropdownName}
                                setVisible={setVisible}
                                onClick={onChange}
                                probableLectors={probableLectors}
                            />
                        )}
                    >
                        <input
                            autoComplete={autoComplete}
                            onClick={() => setVisible(!visible)}
                            type={type}
                            className={
                                handleError ? css.input_error : css.input
                            }
                            onChange={handleSearchChange}
                            id={name}
                            value={value}
                            name={name}
                            placeholder={placeholder}
                            onBlur={onBlur}
                        />
                    </Tippy>
                    {handleError && (
                        <label className={css.input_error_label}>
                            {handleError}
                        </label>
                    )}
                </div>
            </div>
            {!!lectors?.length && (
                <div>
                    {lectors.map((lector, index) => (
                        <div className={css.lector_wrapper} key={index}>
                            <div
                                key={index}
                                className={css.lector_image_wrapper}
                            >
                                <Image
                                    fill
                                    className={css.lector_image}
                                    src={lector.image}
                                    alt={lector.name}
                                />
                            </div>
                            <p className={css.item_text}>
                                {`${lector.name} ${lector.surname}`}
                            </p>
                            <div
                                onClick={() => handleDeleteLector(lector.pk)}
                                className={css.delete_lector_wrapper}
                            >
                                <Exit className={css.delete_lector_button} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};
