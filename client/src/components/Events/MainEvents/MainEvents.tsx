import { forwardRef } from 'react';
import { useRouter } from 'next/router';

import Image from 'next/image';
import minion from '/public/images/Profile/minion.png';
import { EventItem } from 'components/UI/Events/EventItem';
import { BigEventItem } from 'components/UI/Events/BigEventItem';
import { Button } from 'components/UI/Button';
import { useResizeWidth } from 'helpers/useResizeWidth';
import { EventsResponse } from 'http/types';

import css from './MainEvents.module.scss';

interface MainEventsProps {
    events: EventsResponse;
}

export const MainEvents = forwardRef(function MainEvents(
    { events }: MainEventsProps,
    eventsRef
) {
    const router = useRouter();
    const { tabletBreak } = useResizeWidth();

    const onPaginationClick = (page: string) => {
        router.replace({ query: { ...router.query, page: page } }, undefined, {
            scroll: false,
        });
        eventsRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    const pages = [];

    for (let i = 0; i < events.total_pages; i++) {
        pages.push(i + 1);
    }

    return (
        <main ref={eventsRef} className={css.main_events_wrapper}>
            {events.count ? (
                <>
                    <div className={css.first_event_wrapper}>
                        <BigEventItem
                            title={events.results[0].name}
                            href={`events/${events.results[0].pk?.toString()}`}
                            backgroundImg={events.results[0].image}
                            alt={events.results[0].name}
                            start={events.results[0].start}
                            end={events.results[0].end}
                            address={events.results[0].address}
                            becomeSmaller={true}
                        />
                    </div>
                    <div className={css.events_list}>
                        {events.results.map((event, index) => {
                            if (index > 0) {
                                return <EventItem key={index} {...event} />;
                            }
                        })}
                    </div>
                    <div className={css.events_pagination}>
                        <div className={css.events_paginator}>
                            {pages.map((page, index) => (
                                <button
                                    onClick={() => onPaginationClick(page)}
                                    key={index}
                                    className={
                                        events.current_page === page
                                            ? css.events_paginator_button_active
                                            : css.events_paginator_button
                                    }
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div className={css.not_found}>
                    <Image
                        className={css.not_found_img}
                        src={minion}
                        alt={'Не найдено'}
                    />
                    <h2 className={css.not_found_text}>
                        Подходящих мероприятий не найдено
                    </h2>
                </div>
            )}
        </main>
    );
});
