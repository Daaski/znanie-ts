import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import Escape from './icons/Escape.svg';
import Products from './icons/Products.svg';
import BackArrow from './icons/BackArrow.svg';
import MenuShow from './icons/MenuShow.svg';
import { BecomeLinks } from 'components/Header/LinksWrappers/BecomeLinks/BecomeLinks';
import { ProjectLinks } from 'components/Header/LinksWrappers/ProjectLinks/ProjectLinks';

import css from './Menu.module.scss';

export const Menu = () => {
    const [visible, setVisible] = useState(false);
    const [projectsVisible, setProjectsVisible] = useState(false);

    return (
        <>
            <MenuShow
                onClick={() => setVisible(!visible)}
                style={{ cursor: 'pointer' }}
            />
            {visible && (
                <div
                    onClick={() => {
                        setVisible(!visible);
                        setProjectsVisible(false);
                    }}
                    className={css.menu_outer}
                >
                    <motion.nav
                        onClick={(e) => e.stopPropagation()}
                        initial={{ x: '200%' }}
                        animate={{
                            translateX: '-200%',
                        }}
                        transition={{ ease: 'easeOut', duration: 0.3 }}
                        className={css.menu}
                    >
                        <Escape
                            onClick={() => setVisible(!visible)}
                            className={css.menu_exit}
                        />

                        <div
                            onClick={() => setProjectsVisible(!projectsVisible)}
                            className={
                                projectsVisible
                                    ? css.menu_projects_open
                                    : css.menu_projects
                            }
                        >
                            <div className={css.menu_projects_header}>
                                {projectsVisible ? (
                                    <BackArrow
                                        style={{ transition: '.3s all' }}
                                    />
                                ) : (
                                    <Products
                                        style={{ transition: '.3s all' }}
                                    />
                                )}
                                <span>Мероприятия</span>
                            </div>
                        </div>
                        {projectsVisible && (
                            <ProjectLinks padding="0" boxShadows="none" />
                        )}
                        {!projectsVisible && (
                            <ul className={css.menu_links}>
                                <li className={css.menu_link}>
                                    <Link href={'/lectors'}>Лекторы</Link>
                                </li>
                                <li className={css.menu_link}>
                                    <Link href={'/projects'}>Проекты</Link>
                                </li>
                            </ul>
                        )}
                        {!projectsVisible && (
                            <BecomeLinks
                                setVisible={setVisible}
                                padding="15px 0"
                                boxShadows="none"
                            />
                        )}
                    </motion.nav>
                </div>
            )}
        </>
    );
};
