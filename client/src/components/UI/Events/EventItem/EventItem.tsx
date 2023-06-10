import Image from 'next/image';
import Link from 'next/link';
import { IEvent } from 'store/types/userStore.types';

import css from 'components/UI/Events/EventItem/EventItem.module.scss';
import { DateHelper } from 'helpers/dateHelper';

const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
];

export const EventItem = ({
    pk,
    image,
    status,
    end,
    start,
    address,
    name,
    style,
}: IEvent) => {
    const date = new DateHelper(start, end);

    return (
        <Link
            style={style}
            href={`/events/${pk.toString()}`}
            className={css.event_item}
        >
            <div className={css.event_item_content}>
                <div className={css.event_item_content_header}>
                    {date.monthEqual
                        ? date.datesEqual
                            ? date.startDate
                            : date.startDate + date.endDate
                        : `${date.startDate} - ${date.endDate}`}
                    {date.fullMonth}
                    <span className={css.event_item_separator}>•</span>
                    <p className={css.event_item_content_place}>
                        {address.name}
                    </p>
                </div>
                <h2 className={css.event_item_name}>{name}</h2>
            </div>
            <div className={css.event_item_background}>
                <Image
                    className={css.event_item_background_img}
                    fill
                    src={image}
                    alt="Изображение мероприятия"
                />
            </div>
        </Link>
    );
};
