import React, { memo, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper';
import { SingleEventWithLectors } from 'http/types';
import { BigEventItem } from 'components/UI/Events/BigEventItem';
import { DateHelper } from 'helpers/dateHelper';
import { Button } from 'components/UI/Button';
import { LectorItem } from 'components/Event/LectorItem';
import Clock from '/public/images/AboutSvg/Clock.svg';
import SandClock from 'components/Event/icons/sandclock.svg';
import Region from '/public/images/AboutSvg/Region.svg';
import Arrow from '/public/images/Arrows/circleArrow.svg';
import Like from 'components/Event/icons/like.svg';
import { useResizeWidth } from 'helpers/useResizeWidth';
import { useUserStore } from 'store/UserStore';
import { useModalVisible } from 'store/ModalVisible';
import { checkEvent } from 'helpers/checkEvent';
import { handleSelectClick } from 'components/Event/helpers/handleSelectClick';
import { handleUnsubscribe } from 'components/Event/helpers/handleUnsubscrive';
import { handleFavorites } from 'components/Event/helpers/handleFavorites';
import { handleLike } from 'components/Event/helpers/handleLike';

import css from './Event.module.scss';

import 'swiper/scss/free-mode';
import 'swiper/scss';

interface EventProps {
    event: SingleEventWithLectors;
}

export const Event = memo(function Event({ event }: EventProps) {
    const [user] = useUserStore((state) => [state.user]);
    const [setUser] = useUserStore((state) => [state.setUser]);
    const [setModalVisible] = useModalVisible((state) => [
        state.setModalVisible,
    ]);
    const swiperRef = useRef<SwiperClass>();

    const { tabletBreak, semiTabletBreak } = useResizeWidth();

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
                {past && (
                    <section className={css.registration_content}>
                        <h3 className={css.registration_date}>
                            Запись до {date.startDate} {date.fullMonth}
                        </h3>
                        {checkEvent(user.events, event.pk) ? (
                            <div className={css.button_wrapper}>
                                <Button
                                    handleClick={() =>
                                        handleUnsubscribe(
                                            event.pk,
                                            user,
                                            setUser
                                        )
                                    }
                                    big={!tabletBreak}
                                >
                                    Отменить запись
                                </Button>
                            </div>
                        ) : (
                            <div className={css.button_wrapper}>
                                <Button
                                    handleClick={() =>
                                        handleSelectClick(
                                            user,
                                            setUser,
                                            setModalVisible,
                                            event.pk
                                        )
                                    }
                                    big={!tabletBreak}
                                    buttonType="primary"
                                >
                                    Записаться
                                </Button>
                            </div>
                        )}
                        {checkEvent(user.events, event.pk) && (
                            <div className={css.event_service_wrapper}>
                                <div
                                    onClick={() =>
                                        handleLike(user, setUser, event.pk)
                                    }
                                    className={css.event_service}
                                >
                                    <Like
                                        className={
                                            checkEvent(user.likes, event.pk)
                                                ? css.event_service_img_active
                                                : css.event_service_img
                                        }
                                    />
                                    <p>Нравится</p>
                                </div>
                                <div
                                    onClick={() =>
                                        handleFavorites(user, setUser, event.pk)
                                    }
                                    className={css.event_service}
                                >
                                    <SandClock
                                        className={
                                            checkEvent(user.favorites, event.pk)
                                                ? css.event_service_img_active
                                                : css.event_service_img
                                        }
                                    />

                                    <p>Смотреть позже</p>
                                </div>
                            </div>
                        )}
                    </section>
                )}
            </div>
            <div className={css.lectors}>
                <div className={css.lectors_header}>
                    <h2 className={css.lectors_header_title}>Лекторы</h2>
                </div>
                <div className={css.lectors_swiper_wrapper}>
                    {!semiTabletBreak && (
                        <Arrow
                            className={css.lectors_slide_prev}
                            onClick={() => swiperRef.current?.slidePrev()}
                        />
                    )}
                    <Swiper
                        breakpoints={{
                            300: {
                                slidesPerView: 'auto',
                                initialSlide: 1,
                            },
                            500: {
                                slidesPerView: 2,
                                initialSlide: 1,
                            },
                            850: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1200: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                        }}
                        onInit={(swiper) => (swiperRef.current = swiper)}
                    >
                        {event.lectors.map((lector, index) => (
                            <SwiperSlide
                                className={css.lector_slide_wrapper}
                                key={index}
                            >
                                <LectorItem {...lector} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {!semiTabletBreak && (
                        <Arrow
                            className={css.lectors_slide_next}
                            onClick={() => swiperRef.current?.slideNext()}
                        />
                    )}
                </div>
            </div>
        </main>
    );
});
