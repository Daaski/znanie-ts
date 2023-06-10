import { useUserStore } from 'store/UserStore';
import { UserContent } from 'components/Profile/UserContent';
import { Navbar } from 'components/Profile/Navbar';
import { ProfileSidebar } from 'components/Profile/ProfileSidebar';
import { Spinner } from 'components/UI/Spinner/Spinner';

import css from './Profile.module.scss';

export const Profile = () => {
    const [user] = useUserStore((state) => [state.user]);

    if (user.tel === '') {
        return <Spinner />;
    }

    return (
        <main className={css.profile_container}>
            <ProfileSidebar
                userSurname={user?.surname as string}
                userImg={user.img}
                userName={user.name}
            />
            <section className={css.profile_content_container}>
                <Navbar />
                <UserContent />
            </section>
        </main>
    );
};
