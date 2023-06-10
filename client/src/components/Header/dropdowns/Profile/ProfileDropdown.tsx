import { motion, MotionValue } from 'framer-motion';
import Link from 'next/link';
import { useUserStore } from 'store/UserStore';
import { IUser } from 'store/types/userStore.types';
import { useRouter } from 'next/router';

import css from 'components/Header/Profile/Profile.module.scss';

interface IProfileProps {
    opacity: MotionValue;
    name: string;
    surname: string;
}

export const ProfileDropdown = ({ opacity, name, surname }: IProfileProps) => {
    const [setUser] = useUserStore((state) => [state.setUser]);
    const router = useRouter();

    const handleExitButton = () => {
        setUser({ isAuth: false } as IUser);
        router.replace('/');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
    };

    return (
        <motion.div style={{ opacity }} className={css.dropdown_wrapper}>
            <h2 className={css.dropdown_name}>
                {name} {surname}
            </h2>
            <Link className={css.profile_link} href="/profile/main">
                Профиль
            </Link>
            <div className={css.user_exit_wrapper}>
                <button onClick={handleExitButton} className={css.user_exit}>
                    Выйти
                </button>
            </div>
        </motion.div>
    );
};
