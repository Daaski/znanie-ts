import Image from 'next/image';
import React from "react";

import css from './Info.module.scss';


export const Info: React.FC = () => {
    return (
        <>
            <section id={'info'} className={css.prize_about}>
                <h2 className={css.prize_title}>о премии</h2>
                <video className={css.prize_video} autoPlay muted loop>
                    <source
                        src="/videos/PremiaZnanie/cube.mp4"
                        type="video/mp4"
                    />
                </video>
                <h4 className={css.prize_about_title}>
                    Номинантом может стать каждый, кто подаст заявку до 18 июля
                </h4>
                <p className={css.prize_about_text}>
                    Премия российского общества «Знание» учреждена для признания
                    достижений российских деятелей просвещения – преподавателей,
                    лекторов, школьных учителей, блогеров, компаний, СМИ, а
                    также других выдающихся людей и проектов из разных областей,
                    осуществляющих просветительскую деятельность. <br />{' '}
                    Лауреатами премии станут просветители, просветительские
                    проекты и компании, завоевавшие высокие оценки экспертов и
                    почетного жюри, а также симпатии зрителей. Премия вручается
                    ежегодно.
                </p>
            </section>
            <div id={'whoCan'} className={css.nominations_layout}>
                <div className={css.nominations_wrapper}>
                    <h2 className={css.nomination_title}>Номинации</h2>
                    <div className={css.nominators_wrapper}>
                        <h4 className={css.nomination_about_title}>
                            Номинантамим могут стать:
                        </h4>
                        <ul className={css.nomination_about_list}>
                            <li className={css.nomination_about_list_item}>
                                Просветитель
                            </li>
                            <li className={css.nomination_about_list_item}>
                                Просветительcкий проект
                            </li>
                            <li className={css.nomination_about_list_item}>
                                Просветительская компания
                            </li>
                        </ul>
                    </div>
                    <div className={css.nomination_info}>
                        <h3 className={css.nomination_info_count}>11</h3>
                        <p className={css.nomination_info_decryption}>
                            номинаций
                        </p>
                    </div>
                    <div className={css.nomination_laureates}>
                        <h3 className={css.nomination_info_count}>21</h3>
                        <p className={css.nomination_info_decryption}>
                            лауреат
                        </p>
                    </div>
                    <div className={css.nomination_about_main}>
                        <h4 className={css.nomination_main_title}>
                            Главная Номинация
                            <br /> «За общий вклад в просвещение»
                        </h4>
                        <p className={css.nomination_main_text}>
                            Победитель определяется голосованием почетного жюри
                            среди номинантов всех номинаций
                        </p>
                    </div>
                    <div className={css.nomination_about_special}>
                        <h4 className={css.nomination_special_title}>
                            СПЕЦИАЛЬНАЯ Номинация
                            <br /> «По версии слушателей»
                        </h4>
                        <p className={css.nomination_special_text}>
                            Победитель определяется открытым голосованием
                            слушателей на сайте
                        </p>
                    </div>
                </div>
                <div className={css.nominate_everyone_wrapper}>
                    <div className={css.nominate_everyone}>
                        <h2 className={css.nominate_everyone_title}>
                            Номинироваться может каждый
                        </h2>
                        <p className={css.nominate_everyone_text}>
                            Номинантом на награду может стать любой человек или
                            проект, ведущие активную просветительскую
                            деятельность. Номинировать можно не только себя, но
                            и интересные проекты и людей, чей вклад в
                            просвещение вы считаете значительным.
                        </p>
                    </div>
                    <div className={css.nominate_everyone_img_wrapper}>
                        <Image
                            alt={'22'}
                            className={css.nominate_everyone_img}
                            src="/images/PremiaZnanie/nominateyear.png"
                            fill
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
