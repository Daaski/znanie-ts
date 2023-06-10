import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import RegionSvg from '/public/images/AboutSvg/Region.svg';
import { BigEventProps } from 'components/UI/Events/BigEventItem/BigEventItem.types';
import { DateHelper } from 'helpers/dateHelper';
import { useUserStore } from 'store/UserStore';

import css from './BigEventItem.module.scss';

export const BigEventItem = ({
    id,
    backgroundSrc,
    backgroundImg,
    description,
    href,
    alt,
    title,
    address,
    end,
    start,
    style,
    becomeSmaller,
    onClick,
}: BigEventProps) => {
    const [user] = useUserStore((state) => [state.user]);
    const router = useRouter();

    const date = new DateHelper(start, end);

    const past = new Date(end).getTime() > new Date().getTime();

    return (
        <div
            style={style}
            className={becomeSmaller ? css.main_event_smaller : css.main_event}
        >
            <div className={css.main_event_content}>
                <div className={css.event_links_title}>
                    {href ? (
                        <Link
                            className={css.event_title_wrapper}
                            href={`${href}`}
                        >
                            <h1 className={css.event_title}>{title}</h1>
                        </Link>
                    ) : (
                        <h1 className={css.event_title}>{title}</h1>
                    )}

                    {description && (
                        <p className={css.event_description}>{description}</p>
                    )}
                </div>

                {router.query.pk && past && (
                    <button
                        onClick={onClick}
                        className={
                            user.events?.find((e) => e.pk === id)
                                ? css.button_none
                                : css.details_button
                        }
                    >
                        Записаться
                    </button>
                )}

                {!router.query.pk && (
                    <Link href={`${href}`} className={css.details_button}>
                        Подробнее
                    </Link>
                )}

                {start && (
                    <div className={css.main_event_description}>
                        <div className={css.event_description_date}>
                            <p className={css.description_date_text}>
                                {date.monthEqual
                                    ? date.datesEqual
                                        ? date.startDate
                                        : date.startDate + date.endDate
                                    : `${date.startDate} - ${date.endDate}`}
                                {date.fullMonth}
                            </p>
                            <p className={css.month}>{date.fullMonth}</p>
                        </div>
                        <div className={css.event_description_place}>
                            <RegionSvg className={css.region_svg} />
                            <p className={css.event_description_place_title}>
                                {address.name}
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <div
                style={
                    backgroundSrc
                        ? { backgroundImage: `url(${backgroundImg})` }
                        : undefined
                }
                className={css.event_background_wrapper}
            >
                {backgroundSrc ? (
                    <video className={css.event_background} autoPlay muted loop>
                        <source src={backgroundSrc} />
                    </video>
                ) : (
                    <Image
                        fill
                        className={css.event_background}
                        src={backgroundImg}
                        alt={alt}
                    />
                )}
            </div>
        </div>
    );
};
