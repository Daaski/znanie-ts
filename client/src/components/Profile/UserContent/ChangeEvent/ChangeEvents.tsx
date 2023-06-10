import Image from 'next/image';

import { useUserStore } from 'store/UserStore';
import { ChangeEventItem } from 'components/Profile/UserContent/ChangeEvent/ChangeEventItem';
import { useState } from 'react';
import { EditEvent } from 'components/Profile/UserContent/ChangeEvent/EditEvent/EditEvent';
import { SingleEventResponse, SingleEventWithLectors } from 'http/types';
import minion from '/public/images/Profile/minion.png';

import css from './ChangeEvent.module.scss';

export const ChangeEvents = () => {
    const [createdEvents] = useUserStore((state) => [state.user.createdEvents]);
    const [mode, setMode] = useState<'create' | 'edit' | 'view'>('view');
    const [event, setEvent] = useState<SingleEventWithLectors>(null);

    return (
        <section>
            <div className={css.dashboard_header}>
                <button
                    onClick={() => {
                        if (mode === 'create' || mode === 'edit') {
                            setMode('view');
                            setEvent(null);
                        } else {
                            setMode('create');
                        }
                    }}
                    className={css.dashboard_header_button_create}
                >
                    {mode === 'view' ? 'Создать событие' : 'Назад'}
                </button>
            </div>

            {mode === 'view' &&
                (!createdEvents.length ? (
                    <div className={css.not_found}>
                        <Image
                            className={css.not_found_img}
                            src={minion}
                            alt={'Не найдено'}
                        />
                        <h2 className={css.not_found_text}>
                            У вас нет созданных мероприятий
                        </h2>
                    </div>
                ) : (
                    <div className={css.dashboard_events_container}>
                        {createdEvents.map((event, i) => (
                            <ChangeEventItem
                                key={i}
                                setEvent={setEvent}
                                setMode={setMode}
                                event={event as SingleEventWithLectors}
                            />
                        ))}
                    </div>
                ))}
            {mode !== 'view' && (
                <EditEvent event={event} mode={mode as 'edit' | 'create'} />
            )}
        </section>
    );
};
