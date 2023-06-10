import Link from 'next/link';

import { EventItem } from 'components/UI/Events/EventItem';
import { SingleEventWithLectors } from 'http/types';
import { deleteEvent, deletePermissionEvent } from 'http/eventsApi';
import { useUserStore } from 'store/UserStore';

import css from './ChangeEventItem.module.scss';

interface ChangeEventItemProps {
    event: SingleEventWithLectors;
    setMode: (mode: 'edit') => void;
    setEvent: (event: SingleEventWithLectors) => void;
}

export const ChangeEventItem = ({
    event,
    setMode,
    setEvent,
}: ChangeEventItemProps) => {
    const [user] = useUserStore((state) => [state.user]);
    const [setUser] = useUserStore((state) => [state.setUser]);

    const handleDeleteEvent = (pk: number) => {
        deletePermissionEvent(pk).then(() =>
            deleteEvent(pk).then((r) => {
                setUser({
                    ...user,
                    createdEvents: user.createdEvents.filter(
                        (event) => event.pk !== pk
                    ),
                });
            })
        );
    };

    return (
        <div className={css.event_item_wrapper}>
            <EventItem style={{ pointerEvents: 'none' }} {...event} />
            <div className={css.event_item_tooltip}>
                <Link
                    href={`/events/${event.pk}`}
                    className={css.event_item_setting}
                >
                    К мероприятию
                </Link>
                <button
                    onClick={() => {
                        setEvent(event);
                        setMode('edit');
                    }}
                    className={css.event_item_setting}
                >
                    Редактировать
                </button>
                <button
                    onClick={() => handleDeleteEvent(event.pk)}
                    className={css.event_item_setting}
                >
                    Удалить
                </button>
            </div>
        </div>
    );
};
