import { Events } from 'components/Profile/UserContent/Events';
import { useUserStore } from 'store/UserStore';

export const Favorites = () => {
    const [favorites] = useUserStore((state) => [state.user.favorites]);
    return <Events events={favorites} which="favorites" />;
};
