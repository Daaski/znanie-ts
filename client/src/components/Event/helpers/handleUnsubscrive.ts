import { unsubscribeSelectEvent } from 'http/userApi';
import { setEvents } from 'lib/setEvents';

export const handleUnsubscribe = (pk, user, setUser) => {
    unsubscribeSelectEvent(pk).then((r) =>
        setEvents(user, setUser, 'deleteSelect', r)
    );
};
