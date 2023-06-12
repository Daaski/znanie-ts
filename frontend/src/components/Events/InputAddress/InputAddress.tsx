import Tippy from '@tippyjs/react';
import { useEffect, useState } from 'react';
import { useSpring } from 'framer-motion';
import { useRouter } from 'next/router';

import AddressIcon from './icons/addressIcon.svg';
import Exit from 'components/Header/Menu/icons/Escape.svg';
import { InputDropdown } from 'components/Events/InputAddress/InputDropdown';
import { removeQueryParam } from 'helpers/removeQueryParams';

import css from './InputAddress.module.scss';

interface InputAddressProps {
    notFound: boolean;
}

export const InputAddress = ({ notFound }: InputAddressProps) => {
    const router = useRouter();
    const opacity = useSpring(0);

    const [subject, setSubject] = useState({ pk: 0, name: '' });
    const [visible, setVisible] = useState(false);
    const [clear, setClear] = useState(false);

    useEffect(() => {
        if (!router.query.subject) {
            setSubject({ pk: 0, name: '' });
        }
    }, [router.query.subject]);

    useEffect(() => {
        subject.name
            ? router.replace(
                  {
                      query: {
                          ...router.query,
                          subject: subject.name,
                          page: 1,
                      },
                  },
                  undefined,
                  { scroll: false }
              )
            : removeQueryParam('subject', router);
    }, [subject.name]);

    function onMount() {
        opacity.set(1);
    }

    function onHide() {
        opacity.set(0);
    }

    const handleClear = () => {
        router
            .replace({
                query: {},
            })
            .then();
    };

    return (
        <div className={css.input_address_container}>
            {notFound && (
                <button onClick={handleClear} className={css.clear_filters}>
                    Сбросить фильтры
                </button>
            )}
            <Tippy
                interactive={true}
                visible={visible}
                onMount={onMount}
                onHide={onHide}
                placement="bottom-start"
                onClickOutside={() => setVisible(!visible)}
                render={() => (
                    <InputDropdown
                        setSubject={setSubject}
                        setVisible={setVisible}
                        opacity={opacity}
                        clear={clear}
                        setClear={setClear}
                    />
                )}
            >
                <div
                    onClick={() => {
                        setVisible(!visible);
                    }}
                    className={
                        notFound
                            ? css.select_address_badFilters
                            : css.select_address
                    }
                >
                    <div
                        className={
                            notFound
                                ? css.address_name_wrapper_disabled
                                : css.address_name_wrapper
                        }
                    >
                        <AddressIcon className={css.address_icon} />
                        <p className={css.address_name}>
                            {subject.name ? subject.name : 'Все регионы'}
                        </p>
                    </div>
                    {subject.name && (
                        <Exit
                            onClick={() => {
                                setSubject({ pk: 0, name: '' });
                                setClear(true);
                            }}
                            className={
                                notFound
                                    ? css.clear_button_disabled
                                    : css.clear_button
                            }
                        />
                    )}
                </div>
            </Tippy>
        </div>
    );
};
