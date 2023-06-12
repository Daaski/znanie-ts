import Link from 'next/link';

import css from './ProjectLinks.module.scss';
import { IEvent } from 'store/types/userStore.types';
import Image from 'next/image';

interface ProjectItemProps {
    event: IEvent;
    borderBottom: string;
}

export const ProjectItem = ({ event, borderBottom }: ProjectItemProps) => {
    return (
        <li
            style={{ borderBottom: borderBottom }}
            className={css.dropdown_item_wrapper}
        >
            <Link className={css.dropdown_item} href={`/events/${event.pk}`}>
                <div className={css.dropdown_img_wrapper}>
                    <Image
                        className={css.dropdown_img}
                        fill
                        src={event.image}
                        alt=""
                    />
                </div>
                <p className={css.dropdown_text}>{event.name}</p>
            </Link>
        </li>
    );
};
