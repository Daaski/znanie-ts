import { favoriteEvent, unsubscribeFavoriteEvent } from 'http/userApi';
import { setEvents } from 'lib/setEvents';
import { IUser, SetUserType } from 'store/types/userStore.types';
import { checkEvent } from 'helpers/checkEvent';

export const handleFavorites = (
    user: IUser,
    setUser: SetUserType,
    pk: number
) => {
    if (checkEvent(user.favorites, pk)) {
        unsubscribeFavoriteEvent(pk).then((r) =>
            setEvents(user, setUser, 'unsubscribeFavorite', r)
        );
    } else {
        favoriteEvent(pk).then((r) => setEvents(user, setUser, 'favorites', r));
    }
};
