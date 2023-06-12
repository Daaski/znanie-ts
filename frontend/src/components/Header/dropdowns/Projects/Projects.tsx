import { useState } from 'react';
import { useSpring } from 'framer-motion';
import Tippy from '@tippyjs/react/headless';

import { ProjectLinks } from 'components/Header/LinksWrappers/ProjectLinks';
import Arrow from '/public/images/Arrows/simpleArrow.svg';

import css from 'components/Header/dropdowns/Projects/Projects.module.scss';

export const Projects = () => {
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
            render={() => <ProjectLinks opacity={opacity} />}
        >
            <div onClick={() => setVisible(!visible)} className={css.action}>
                <p className={css.action_text}>Мероприятия</p>
                <Arrow
                    className={visible ? css.action_svg_open : css.action_svg}
                />
            </div>
        </Tippy>
    );
};
