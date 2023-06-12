import Image from 'next/image';

import { EventItem } from 'components/UI/Events/EventItem';
import { IEvent } from 'store/types/userStore.types';
import minion from '/public/images/Profile/minion.png';

import css from './Events.module.scss';

interface IEventsProps {
    events: IEvent[];
    which?: 'passed' | 'likes' | 'new' | 'favorites';
}

export const Events = ({ events, which }: IEventsProps) => {
    return events?.length ? (
        <div className={css.events_wrapper}>
            {events.map((event, index) => (
                <EventItem key={index} {...event} />
            ))}
        </div>
    ) : (
        <div className={css.not_found}>
            <Image
                className={css.not_found_img}
                src={minion}
                alt={'Не найдено'}
            />
            <h2 className={css.not_found_text}>
                {which === 'passed' || which === 'new'
                    ? 'У вас нет записей на ' +
                      (which === 'passed'
                          ? 'прошедшие'
                          : which === 'new'
                          ? 'предстоящие'
                          : '') +
                      ' мероприятия'
                    : ''}
                {which === 'likes' || which === 'favorites'
                    ? 'Вы пока не добавили ничего в ' +
                      (which === 'likes'
                          ? '"Понравившееся"'
                          : which === 'favorites'
                          ? '"Избранное"'
                          : '')
                    : ''}
            </h2>
        </div>
    );
};
