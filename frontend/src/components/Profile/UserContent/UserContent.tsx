import { useRouter } from 'next/router';
import { Main } from 'components/Profile/UserContent/Main';
import { About } from 'components/Profile/UserContent/About';
import { Likes } from 'components/Profile/UserContent/Likes';
import { Favorites } from 'components/Profile/UserContent/Favorites';
import { ChangeEvents } from 'components/Profile/UserContent/ChangeEvent';

import css from './UserContent.module.scss';
import { useUserStore } from 'store/UserStore';

export const UserContent = () => {
    const [role] = useUserStore((state) => [state.user.role]);
    const router = useRouter();

    if (router.query.slug === 'events-dashboard' && role !== 'lector') {
        router.replace('/profile/404').then();
    }

    return (
        <div className={css.user_content_container}>
            {router.query.slug === 'main' && <Main />}
            {router.query.slug === 'about' && <About />}
            {router.query.slug === 'likes' && <Likes />}
            {router.query.slug === 'favorites' && <Favorites />}
            {router.query.slug === 'events-dashboard' && role === 'lector' && (
                <ChangeEvents />
            )}
        </div>
    );
};
