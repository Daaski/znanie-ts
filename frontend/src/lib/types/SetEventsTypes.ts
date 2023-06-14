import { IEvent, IUser } from 'store/types/userStore.types';

export type SetSelectedEvents = (
    user: IUser,
    setUser: (u: IUser) => void,
    as:
        | 'selected'
        | 'subscribeLike'
        | 'favorites'
        | 'created'
        | 'deleteSelect'
        | 'unsubscribeLike'
        | 'unsubscribeFavorite',
    events?: IEvent[]
) => void;
