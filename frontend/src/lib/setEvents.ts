import { SetSelectedEvents } from 'lib/types/SetEventsTypes';
import { IEvent } from 'store/types/userStore.types';

export const setEvents: SetSelectedEvents = (user, setUser, as, events) => {
    if (as === 'deleteSelect' || as === 'selected') {
        setUser({ ...user, events: events as IEvent[] });
    }

    if (as === 'subscribeLike' || as === 'unsubscribeLike') {
        setUser({ ...user, likes: events as IEvent[] });
    }

    if (as === 'favorites' || as === 'unsubscribeFavorite') {
        setUser({ ...user, favorites: events as IEvent[] });
    }
};
