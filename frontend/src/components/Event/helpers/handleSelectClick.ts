import { selectEvent } from 'http/userApi';
import { setEvents } from 'lib/setEvents';
import { IUser, SetUserType } from 'store/types/userStore.types';

export const handleSelectClick = (
    user: IUser,
    setUser: SetUserType,
    setModalVisible: (b: boolean) => void,
    pk: number
) => {
    if (!user.role) {
        setModalVisible(true);
        return;
    }
    selectEvent(pk).then((r) => setEvents(user, setUser, 'selected', r));
};
