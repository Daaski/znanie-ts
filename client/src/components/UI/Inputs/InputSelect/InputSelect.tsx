import React, { useState } from 'react';

import Tippy from '@tippyjs/react/headless';
import { InputSelectProps } from 'components/UI/Inputs/InputSelect/InputSelect.types';
import { SearchList } from 'components/UI/Inputs/InputSelect/SearchList';
import { getFilterPlaces } from 'http/placesApi';

import css from './InputSelect.module.scss';

function getAllBeforeComaComma(string: string) {
    if (string?.indexOf('г') !== -1) {
        return string?.slice(string.indexOf('г.') + 2).trim();
    }

    return string.trim().split(',').pop();
}

export const InputSelect = ({
    type,
    placeholder,
    name,
    onChange,
    onBlur,
    label,
    value,
    disabled,
    dropdownName,
    autoComplete,
    which,
    handleError,
}: InputSelectProps) => {
    const [visible, setVisible] = useState(false);
    const [probablePlaces, setProbablePlaces] = useState<
        { pk: number; name: string; subject: string; type: string }[]
    >([]);

    const handleSearchChange = (e) => {
        onChange({ name: e.target.value });
        setVisible(true);
        !disabled &&
            getFilterPlaces(getAllBeforeComaComma(e.target.value), which).then(
                (r) => setProbablePlaces(r)
            );
    };

    const onClickOutside = async () => {
        setVisible(false);
        which === 'address/'
            ? await getFilterPlaces(
                  getAllBeforeComaComma(value.name),
                  which
              ).then((r) => {
                  if (
                      !r
                          .map((place) => place.name)
                          .includes(getAllBeforeComaComma(value.name))
                  ) {
                      onChange({ id: 0, name: '' });
                  }
                  r.forEach((place) => {
                      if (
                          place.name.toLowerCase() ===
                          getAllBeforeComaComma(value?.name?.toLowerCase())
                      ) {
                          onChange({
                              name: `${place.subject}, ${place.type} ${place.name}`,
                              id: place.pk,
                          });
                      }
                  });
              })
            : await getFilterPlaces(value.name, which).then((r) => {
                  if (!r.map((place) => place.name).includes(value.name)) {
                      onChange({ id: 0, name: '' });
                  }
              });
    };

    return (
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
                    disabled={disabled as boolean}
                    render={() => (
                        <SearchList
                            dropdownName={dropdownName}
                            disabled={disabled as boolean}
                            setVisible={setVisible}
                            onClick={onChange}
                            probablePlaces={
                                value.name?.length !== 0 ? probablePlaces : []
                            }
                        />
                    )}
                >
                    <input
                        autoComplete={autoComplete}
                        disabled={disabled}
                        onClick={() => {
                            setVisible(!visible);
                        }}
                        type={type}
                        className={handleError ? css.input_error : css.input}
                        onChange={handleSearchChange}
                        value={value.name}
                        id={name}
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
    );
};
