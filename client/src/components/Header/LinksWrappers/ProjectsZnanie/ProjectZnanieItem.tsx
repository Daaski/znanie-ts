import { CSSProperties, FC } from 'react';
import Link from 'next/link';

import { IEvent } from 'store/types/userStore.types';

import css from 'components/Header/LinksWrappers/ProjectsZnanie/ProjectsZnanie.module.scss';

type project = {
    href: string;
    name: string;
    description: string;
    img: string;
};

interface ProjectItemProps {
    event: project;
}

export const ProjectZnanieItem: FC<ProjectItemProps> = ({
    event,
    borderBottom,
}) => {
    return (
        <li
            style={{ borderBottom: borderBottom }}
            className={css.dropdown_item_wrapper}
        >
            <Link className={css.dropdown_item} href={event.href}>
                <div
                    style={{
                        backgroundImage: `url(${event.img})`,
                    }}
                    className={css.dropdown_img_wrapper}
                />
                <p className={css.dropdown_text}>{event.name}</p>
            </Link>
        </li>
    );
};
