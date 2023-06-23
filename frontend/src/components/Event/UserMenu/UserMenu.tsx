import React, { memo } from 'react';

import { checkEvent } from 'helpers/checkEvent';
import { Button } from 'components/UI/Button';
import { handleUnsubscribe } from 'components/Event/helpers/handleUnsubscrive';
import { handleSelectClick } from 'components/Event/helpers/handleSelectClick';
import { handleLike } from 'components/Event/helpers/handleLike';
import Like from 'components/Event/icons/like.svg';
import { handleFavorites } from 'components/Event/helpers/handleFavorites';
import SandClock from 'components/Event/icons/sandclock.svg';
import { UserMenuProps } from 'components/Event/Event.types';
import { DateHelper } from 'helpers/dateHelper';
import { useResizeWidth } from 'helpers/useResizeWidth';
import { useUserStore } from 'store/UserStore';
import { useModalVisible } from 'store/ModalVisible';

import css from './UserMenu.module.scss'

export const UserMenu = memo(function UserMenu ({past, event}: UserMenuProps) {
    const [user] = useUserStore((state) => [state.user]);
    const [setUser] = useUserStore((state) => [state.setUser]);
    const [setModalVisible] = useModalVisible((state) => [
        state.setModalVisible,
    ]);
    const { tabletBreak } = useResizeWidth();

    const date = new DateHelper(event.start, event.end);

    return past ? (
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
                                setUser,
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
                                event.pk,
                            )
                        }
                        big={!tabletBreak}
                        buttonType='primary'
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
    ) : null
})