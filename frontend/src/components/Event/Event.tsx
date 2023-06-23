import React, { memo } from 'react';

import { BigEventItem } from 'components/UI/Events/BigEventItem';
import { DateHelper } from 'helpers/dateHelper';
import Clock from '/public/images/AboutSvg/Clock.svg';
import Region from '/public/images/AboutSvg/Region.svg';
import { useUserStore } from 'store/UserStore';
import { useModalVisible } from 'store/ModalVisible';
import { handleSelectClick } from 'components/Event/helpers/handleSelectClick';
import { EventProps } from 'components/Event/Event.types';
import { LectorSwiper } from 'components/Event/LectorSwiper';
import { UserMenu } from 'components/Event/UserMenu';

import css from './Event.module.scss';
import 'swiper/scss/free-mode';
import 'swiper/scss';


export const Event = memo(function Event({ event }: EventProps) {
    const [user] = useUserStore((state) => [state.user]);
    const [setUser] = useUserStore((state) => [state.setUser]);
    const [setModalVisible] = useModalVisible((state) => [
        state.setModalVisible,
    ]);

    const date = new DateHelper(event.start, event.end);

    const past = new Date(event.end).getTime() > new Date().getTime();

    return (
        <main className={css.event_container}>
            <BigEventItem
                onClick={() =>
                    handleSelectClick(user, setUser, setModalVisible, event.pk)
                }
                id={event.pk}
                backgroundImg={event.image}
                alt={event.name}
                start={event.start}
                end={event.end}
                address={event.address}
                title={event.name}
            />
            <div className={css.user_content}>
                <section className={css.event_description}>
                    <div className={css.description_title_wrapper}>
                        <h2 className={css.event_description_title}>
                            О мероприятии
                        </h2>
                        <h2 className={css.event_description_ended}>
                            {!past && 'Мероприятие закончилось'}
                        </h2>
                    </div>
                    <p className={css.event_description_text}>{event.about}</p>
                    <p className={css.event_description_text}>
                        {event.description}
                    </p>
                    <div className={css.event_description_about_place}>
                        <div className={css.event_description_date}>
                            <Clock className={css.event_about_svg} />
                            <p>
                                {date.startDate} {date.fullMonth}
                            </p>
                        </div>
                        <div className={css.event_description_region}>
                            <Region className={css.event_about_svg} />
                            <p>{event.address.name}</p>
                        </div>
                    </div>
                </section>
                <UserMenu past={past} event={event}/>
            </div>
            <LectorSwiper event={event} />
        </main>
    );
});
