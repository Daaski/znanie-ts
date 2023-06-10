import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass, { FreeMode } from 'swiper';

import { getDaysInMonthWithIteration } from 'helpers/getDateInMonth';
import Arrow from '/public/images/Arrows/simpleArrow.svg';
import { months } from 'helpers/getDateInMonth';
import { PickDate } from 'components/Events/Calendar/PickDate';
import { removeQueryParam } from 'helpers/removeQueryParams';
import {
    checkActive,
    checkEndDay,
    checkPassive,
    checkStartDay,
} from 'components/Events/Calendar/Helper';

import css from './Calendar.module.scss';

import 'swiper/scss/free-mode';
import 'swiper/scss';

const year = new Date().getFullYear();

export const Calendar = () => {
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const router = useRouter();
    const swiperRef = useRef<SwiperClass>();

    const calendarDaysArr = useMemo(() => {
        return getDaysInMonthWithIteration(4);
    }, []);

    useEffect(() => {
        if (!router.query.start) {
            setStartDate(null);
            setEndDate(null);
        }
    }, [router.query.start]);

    useEffect(() => {
        startDate
            ? router.replace(
                  {
                      query: {
                          ...router.query,
                          start: `${year}-${
                              startDate?.getMonth() + 1
                          }-${startDate?.getDate()}`,
                          page: 1,
                      },
                  },
                  undefined,
                  { scroll: false }
              )
            : removeQueryParam('start', router);
    }, [startDate]);

    useEffect(() => {
        setTimeout(() => {
            endDate
                ? router.replace(
                      {
                          query: {
                              ...router.query,
                              end: `${year}-${
                                  endDate?.getMonth() + 1
                              }-${endDate?.getDate()}`,
                              page: 1,
                          },
                      },
                      undefined,
                      { scroll: false }
                  )
                : removeQueryParam('end', router);
        }, 0);
    }, [endDate]);

    useEffect(() => {
        if (startDate?.getTime() === endDate?.getTime()) {
            setEndDate(null);
        }
        if (startDate?.getTime() > endDate?.getTime()) {
            setStartDate(endDate);
            setEndDate(startDate);
        }
    }, [endDate, startDate]);

    const handleDayClick = (month: number, day: number) => {
        const selectDate = new Date(year, month, day);

        if (!startDate) {
            setStartDate(selectDate);
        } else if (
            endDate?.getTime() === selectDate.getTime() &&
            endDate?.getTime()
        ) {
            setStartDate(endDate);
            setEndDate(null);
        } else if (
            startDate.getTime() === selectDate.getTime() &&
            !endDate?.getTime()
        ) {
            setStartDate(null);
        } else if (selectDate.getTime() < startDate.getTime() && endDate) {
            setStartDate(selectDate);
        } else {
            setEndDate(selectDate);
        }
    };

    return (
        <div className={css.calendar_container}>
            <Arrow
                onClick={() => swiperRef.current?.slidePrev()}
                className={css.calendar_prevArrow}
            />
            <Swiper
                freeMode={{
                    enabled: true,
                    momentum: true,
                }}
                initialSlide={3}
                grabCursor={true}
                modules={[FreeMode]}
                className={css.calendar_swiper}
                slidesPerView={'auto'}
                onInit={(slider) => (swiperRef.current = slider)}
            >
                <SwiperSlide className={css.calendar_slide}>
                    <PickDate setStart={setStartDate} setEnd={setEndDate} />
                </SwiperSlide>
                {calendarDaysArr.map((calendarDays, indexArr) => (
                    <SwiperSlide className={css.calendar_slide} key={indexArr}>
                        <div className={css.slide_days_wrapper}>
                            {calendarDays.map((day, indexDays) => (
                                <div className={css.slide_days} key={indexDays}>
                                    {indexDays === 0 && (
                                        <p className={css.slide_days_month}>
                                            {months[day.month]}
                                        </p>
                                    )}
                                    <div
                                        onClick={() =>
                                            handleDayClick(day.month, day.day)
                                        }
                                        className={
                                            checkStartDay(
                                                startDate,
                                                endDate,
                                                new Date(
                                                    year,
                                                    day.month,
                                                    day.day
                                                )
                                            )
                                                ? css.day_start_passive
                                                : checkEndDay(
                                                      startDate,
                                                      endDate,
                                                      new Date(
                                                          year,
                                                          day.month,
                                                          day.day
                                                      )
                                                  )
                                                ? css.day_end_passive
                                                : ''
                                        }
                                    >
                                        <div
                                            className={
                                                checkActive(
                                                    startDate,
                                                    endDate,
                                                    new Date(
                                                        year,
                                                        day.month,
                                                        day.day
                                                    )
                                                )
                                                    ? css.calendar_day_active
                                                    : checkPassive(
                                                          startDate,
                                                          endDate,
                                                          new Date(
                                                              year,
                                                              day.month,
                                                              day.day
                                                          )
                                                      )
                                                    ? css.calendar_day_passive
                                                    : css.calendar_day_wrapper
                                            }
                                        >
                                            <div className={css.calendar_day}>
                                                <p>{day.day}</p>
                                            </div>
                                            <div
                                                className={
                                                    day.dayOfWeek === 'сб' ||
                                                    day.dayOfWeek === 'вс'
                                                        ? css.calendar_holiday
                                                        : css.calendar_weekDay
                                                }
                                            >
                                                <span>{day.dayOfWeek}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SwiperSlide>
                ))}
                <SwiperSlide className={css.calendar_slide}>
                    <PickDate setStart={setStartDate} setEnd={setEndDate} />
                </SwiperSlide>
            </Swiper>
            <Arrow
                onClick={() => swiperRef.current?.slideNext()}
                className={css.calendar_nextArrow}
            />
        </div>
    );
};
