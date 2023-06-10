import { SetSelectedEvents } from 'lib/types/SetEventsTypes';

export const setEvents: SetSelectedEvents = (user, setUser, as, events) => {
    if (as === 'deleteSelect' || as === 'selected') {
        setUser({ ...user, events: events });
    }

    if (as === 'subscribeLike' || as === 'unsubscribeLike') {
        setUser({ ...user, likes: events });
    }

    if (as === 'favorites' || as === 'unsubscribeFavorite') {
        setUser({ ...user, favorites: events });
    }
};
