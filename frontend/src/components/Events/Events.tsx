import { memo, useEffect, useRef } from 'react';

import { Calendar } from 'components/Events/Calendar';
import { InputAddress } from 'components/Events/InputAddress';
import { MainEvents } from 'components/Events/MainEvents';
import { EventsResponse } from 'http/types';
import NProgress from 'nprogress';

import css from './Events.module.scss';

interface EventsProps {
    events: EventsResponse;
}

export const Events = memo(function Events({ events }: EventsProps) {
    const eventsRef = useRef(null);
    const notFound = !events.count;
    useEffect(() => {
        if (!events.results.length && events.count !== 0) {
            NProgress.start();
        } else {
            NProgress.done();
        }
    }, [events.count, events.results.length]);

    return (
        <main className={css.events_container}>
            <h1 className={css.events_header}>Мероприятия</h1>
            <Calendar />
            <InputAddress notFound={notFound} />
            <MainEvents ref={eventsRef} events={events} />
        </main>
    );
});
