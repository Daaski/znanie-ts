import { useState } from 'react';
import { useSpring } from 'framer-motion';

import { BecomeLinks } from 'components/Header/LinksWrappers/BecomeLinks/BecomeLinks';
import Tippy from '@tippyjs/react/headless';
import Arrow from '/public/images/Arrows/simpleArrow.svg';
import { useUserStore } from 'store/UserStore';

import css from './Become.module.scss';

export const Become = () => {
    const [user] = useUserStore((state) => [state.user]);
    const [visible, setVisible] = useState(false);
    const opacity = useSpring(0);

    function onMount() {
        opacity.set(1);
    }

    function onHide() {
        opacity.set(0);
    }

    if (user.role === 'lector') {
        return null;
    }

    return (
        <Tippy
            visible={visible}
            onMount={onMount}
            onHide={onHide}
            interactive={true}
            placement={'bottom-end'}
            onClickOutside={() => setVisible(!visible)}
            render={() => (
                <BecomeLinks setVisible={setVisible} opacity={opacity} />
            )}
        >
            <div onClick={() => setVisible(!visible)} className={css.action}>
                <p className={css.action_text}>Вступить в Знание</p>
                <Arrow
                    className={visible ? css.action_svg_open : css.action_svg}
                />
            </div>
        </Tippy>
    );
};
