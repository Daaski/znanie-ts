import Link from 'next/link';

import { Become } from './dropdowns/Become';
import { Projects } from './dropdowns/Projects';
import { Login } from '../LoginModal/Login/Login';
import { useUserStore } from 'store/UserStore';
import { Menu } from './Menu';
import LogoSvg from './icons/logo.svg';
import { Profile } from './Profile';
import { useModalVisible } from 'store/ModalVisible';
import { ProjectsDropdown } from 'components/Header/dropdowns/ProjectsDropdown';

import css from './Header.module.scss';

export const Header = () => {
    const [user] = useUserStore((state) => [state.user]);
    const [modalVisible] = useModalVisible((state) => [state.modalVisible]);
    const [setModalVisible] = useModalVisible((state) => [
        state.setModalVisible,
    ]);

    return (
        <header className={css.header}>
            <Link href={'/'} className={css.logo}>
                <LogoSvg />
            </Link>
            <div className={css.actions_wrapper}>
                <div className={css.dropdown_wrapper}>
                    <Become />
                </div>
                <div className={css.dropdown_wrapper}>
                    <ProjectsDropdown />
                </div>
                <div className={css.dropdown_wrapper}>
                    <Projects />
                </div>
                <div className={css.login_wrapper}>
                    {user.isAuth ? (
                        <Profile />
                    ) : (
                        <Login
                            modalVisible={modalVisible}
                            setModalVisible={setModalVisible}
                        />
                    )}
                </div>
                <Menu />
            </div>
        </header>
    );
};
