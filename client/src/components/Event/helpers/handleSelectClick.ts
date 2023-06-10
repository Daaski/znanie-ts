import { selectEvent } from 'http/userApi';
import { setEvents } from 'lib/setEvents';
import { IUser } from 'store/types/userStore.types';

export const handleSelectClick = (
    user: IUser,
    setUser,
    setModalVisible,
    pk
) => {
    if (!user.role) {
        setModalVisible(true);
        return;
    }
    selectEvent(pk).then((r) => setEvents(user, setUser, 'selected', r));
};
