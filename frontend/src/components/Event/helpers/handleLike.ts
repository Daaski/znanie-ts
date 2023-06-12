import { likeEvent, unsubscribeLikeEvent } from 'http/userApi';
import { setEvents } from 'lib/setEvents';
import { IUser, SetUserType } from 'store/types/userStore.types';
import { checkEvent } from 'helpers/checkEvent';

export const handleLike = (user: IUser, setUser: SetUserType, pk: number) => {
    if (checkEvent(user.likes, pk)) {
        unsubscribeLikeEvent(pk).then((r) =>
            setEvents(user, setUser, 'unsubscribeLike', r)
        );
    } else {
        likeEvent(pk).then((r) => setEvents(user, setUser, 'subscribeLike', r));
    }
};
