import { useState } from 'react';

import { Button } from 'components/UI/Button';
import { Events } from 'components/Profile/UserContent/Events';
import { useResizeWidth } from 'helpers/useResizeWidth';
import Lector from 'components/Header/icons/Lector.svg';
import { useUserStore } from 'store/UserStore';
import { getPastOrWillEvents } from 'lib/getPastOrWillEvents';
import { IEvent } from 'store/types/userStore.types';

import css from 'components/Profile/UserContent/Main/Main.module.scss';

export const Main = () => {
    const [role] = useUserStore((state) => [state.user.role]);
    const [events] = useUserStore((state) => [state.user.events]);
    const [filteredEvents, setFilteredEvents] = useState<IEvent[]>(
        getPastOrWillEvents(events as IEvent[], 'new')
    );

    const [which, setWhich] = useState<'passed' | 'new'>('new');

    function getEvents(when: 'passed' | 'new') {
        setFilteredEvents(getPastOrWillEvents(events as IEvent[], when));
        setWhich(when);
    }

    const { tabletBreak } = useResizeWidth();
    return (
        <section className={css.main_container}>
            {role !== 'lector' && (
                <div className={css.become_someone}>
                    <div className={css.become}>
                        <div className={css.become_header}>
                            <h2 className={css.become_title}>
                                Стать лектором Российского общества «Знание»
                            </h2>
                            <div className={css.become_img_wrapper}>
                                <Lector className={css.become_img} />
                            </div>
                        </div>
                        <Button
                            href="/become-lector"
                            style={
                                tabletBreak
                                    ? { padding: '6px 10px', fontSize: '12px' }
                                    : {}
                            }
                        >
                            Подать заявку
                        </Button>
                    </div>
                </div>
            )}
            <div className={css.main_events_container}>
                <div className={css.events_nav}>
                    <button
                        onClick={() => getEvents('new')}
                        className={
                            which === 'will'
                                ? css.events_button_active
                                : css.events_button
                        }
                    >
                        Предстоящие мероприятия
                    </button>
                    <span style={{ color: 'black' }}>/</span>
                    <button
                        onClick={() => getEvents('passed')}
                        className={
                            which === 'past'
                                ? css.events_button_active
                                : css.events_button
                        }
                    >
                        Прошедшие мероприятия
                    </button>
                </div>
                <Events which={which} events={filteredEvents} />
            </div>
        </section>
    );
};
