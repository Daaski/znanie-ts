import { useState } from 'react';
import { useSpring } from 'framer-motion';
import Image from 'next/image';
import Tippy from '@tippyjs/react';

import { ProfileDropdown } from 'components/Header/dropdowns/Profile/ProfileDropdown';
import { useUserStore } from 'store/UserStore.ts';

import css from './Profile.module.scss';

export const Profile = () => {
    const [user, setUser] = useUserStore((state) => [
        state.user,
        state.setUser,
    ]);
    const [visible, setVisible] = useState(false);
    const opacity = useSpring(0);

    function onMount() {
        opacity.set(1);
    }

    function onHide() {
        opacity.set(0);
    }

    return (
        <Tippy
            interactive={true}
            visible={visible}
            onMount={onMount}
            onHide={onHide}
            placement={'bottom-end'}
            onClickOutside={() => setVisible(!visible)}
            render={(attrs) => (
                <ProfileDropdown
                    attrs={attrs}
                    name={user.name}
                    opacity={opacity}
                    surname={user.surname}
                />
            )}
        >
            <div
                onClick={() => setVisible(!visible)}
                className={css.profile_pick}
            >
                {user.img && (
                    <Image
                        style={{ borderRadius: '50%' }}
                        src={user.img}
                        fill
                        alt="Фото пользователя"
                    />
                )}
            </div>
        </Tippy>
    );
};
