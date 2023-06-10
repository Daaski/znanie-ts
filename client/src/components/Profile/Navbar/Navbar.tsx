import { useRouter } from 'next/router';

import css from './Navbar.module.scss';
import { useUserStore } from 'store/UserStore';
import Link from 'next/link';

export const Navbar = () => {
    const [role] = useUserStore((state) => [state.user.role]);
    const router = useRouter();
    return (
        <nav className={css.profile_content_header}>
            <Link
                href="main"
                className={
                    router.query.slug === 'main'
                        ? css.profile_content_header_button_active
                        : css.profile_content_header_button
                }
            >
                Ваш кабинет
            </Link>
            <Link
                href="about"
                className={
                    router.query.slug === 'about'
                        ? css.profile_content_header_button_active
                        : css.profile_content_header_button
                }
            >
                Личные данные
            </Link>
            <Link
                href="likes"
                className={
                    router.query.slug === 'likes'
                        ? css.profile_content_header_button_active
                        : css.profile_content_header_button
                }
            >
                Понравившееся
            </Link>
            <Link
                href="favorites"
                className={
                    router.query.slug === 'favorites'
                        ? css.profile_content_header_button_active
                        : css.profile_content_header_button
                }
            >
                Смотреть позже
            </Link>
            {role === 'lector' && (
                <Link
                    href="events-dashboard"
                    className={
                        router.query.slug === 'events-dashboard'
                            ? css.profile_content_header_button_active
                            : css.profile_content_header_button
                    }
                >
                    Редактировать события
                </Link>
            )}
        </nav>
    );
};
