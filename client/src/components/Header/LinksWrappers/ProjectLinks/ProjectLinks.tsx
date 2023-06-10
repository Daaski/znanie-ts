import { FC, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

import { LinksProps } from 'components/Header/LinksWrappers/Links.types.ts';
import { ProjectItem } from 'components/Header/LinksWrappers/ProjectLinks/ProjectItem.tsx';
import { Button } from 'components/UI/Button/Button.tsx';
import { getFilterEvents } from 'http/eventsApi';
import { IEvent } from 'store/types/userStore.types';

import css from 'components/Header/LinksWrappers/ProjectLinks/ProjectLinks.module.scss';

export const ProjectLinks: FC<LinksProps> = ({
    padding,
    boxShadows,
    opacity,
}) => {
    const [events, setEvents] = useState<IEvent[]>();
    useMemo(() => {
        getFilterEvents().then((r) => setEvents(r.results));
    }, []);

    if (!events) {
        return <></>;
    }

    return (
        <motion.div
            style={{
                opacity,
                boxShadow: boxShadows,
                padding: padding,
            }}
            className={css.dropdown_wrapper}
        >
            <ul className={css.dropdown}>
                {events?.map((e, index) => {
                    if (index < 3) {
                        return (
                            <ProjectItem
                                borderBottom={boxShadows as string}
                                key={index}
                                event={e}
                            />
                        );
                    }
                })}
                <Button
                    style={{ width: '100%', marginTop: '25px' }}
                    href={'/events'}
                >
                    Смотреть все
                </Button>
            </ul>
        </motion.div>
    );
};
