import { unsubscribeSelectEvent } from 'http/userApi';
import { setEvents } from 'lib/setEvents';
import { IUser, SetUserType } from 'store/types/userStore.types';

export const handleUnsubscribe = (
    pk: number,
    user: IUser,
    setUser: SetUserType
) => {
    unsubscribeSelectEvent(pk).then((r) =>
        setEvents(user, setUser, 'deleteSelect', r)
    );
};
