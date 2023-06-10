import { Events } from 'components/Profile/UserContent/Events';
import { useUserStore } from 'store/UserStore';

export const Likes = () => {
    const [likes] = useUserStore((state) => [state.user.likes]);
    return <Events events={likes} which="likes" />;
};
