import { useState } from 'react';
import { useSpring } from 'framer-motion';

import Tippy from '@tippyjs/react/headless';
import Arrow from '/public/images/Arrows/simpleArrow.svg';

import css from 'components/Header/dropdowns/Become/Become.module.scss';
import { ProjectsZnanie } from 'components/Header/LinksWrappers/ProjectsZnanie';

export const ProjectsDropdown = () => {
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
            visible={visible}
            onMount={onMount}
            onHide={onHide}
            interactive={true}
            placement={'bottom-end'}
            onClickOutside={() => setVisible(!visible)}
            render={() => (
                <ProjectsZnanie setVisible={setVisible} opacity={opacity} />
            )}
        >
            <div onClick={() => setVisible(!visible)} className={css.action}>
                <p className={css.action_text}>Проекты</p>
                <Arrow
                    className={visible ? css.action_svg_open : css.action_svg}
                />
            </div>
        </Tippy>
    );
};
