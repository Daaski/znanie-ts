import Image from 'next/image';

import stages from "./data"
import {StageItem} from "./StageItem";

import css from './Stages.module.scss';


export const Stages = () => {
    return (
        <>
            <div id={'stages'} className={css.stagesjury_bg}>
                <div className={css.stages_layout}>
                    <div className={css.stages}>
                        <h2 className={css.stages_title}>этапы конкурса</h2>
                        <div className={css.stages_info_wrapper}>
                            <ul className={css.stages_info}>
                                {stages.map(stage => (
                                    <StageItem key={stage.id} {...stage}/>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={css.jury_layout}>
                    <div className={css.jury}>
                        <div className={css.jury_text_wrapper}>
                            <h2 className={css.jury_title}>жюри</h2>
                            <p className={css.jury_text}>
                                <span className={css.jury_text_span}>
                                    Экспертная комиссия
                                </span>{' '}
                                отберет номинантов из числа подавших заявки на
                                сайте и сформирует списки претендентов по каждой
                                из номинаций. В экспертную комиссию войдут
                                лекторы «Знания», представители партнерских
                                вузов и организаций.
                            </p>
                            <p className={css.jury_text}>
                                <span className={css.jury_text_span}>
                                    Почетное жюри
                                </span>{' '}
                                в ходе второго этапа отбора определит лауреатов
                                премии в каждой из номинаций путем голосования.
                                В состав почетного жюри войдут выдающиеся
                                представители из разных областей: науки,
                                искусства, бизнеса, спорта и государственные
                                деятели.
                            </p>
                        </div>
                        <div className={css.jury_img} />
                    </div>
                </div>
            </div>
            <div className={css.fulltime_layout}>
                <div className={css.fulltime}>
                    <span className={css.fulltime_img}>
                        <Image
                            alt={'Очный формат'}
                            src="/images/PremiaZnanie/fulltime.png"
                            fill
                        />
                    </span>
                    <div className={css.fulltime_text_wrapper}>
                        <h2 className={css.fulltime_title}>Очный формат</h2>
                        <p className={css.fulltime_text}>
                            <span className={css.fulltime_text_span}>
                                Заседание почетного жюри
                            </span>{' '}
                            пройдет в Москве в очном формате в октябре.
                            Организаторы пригласят всех номинантов, вошедших в
                            шорт-листов премии, приехать на заседание и лично
                            рассказать о своей просветительской деятельности
                            членам почетного жюри в формате короткого доклада.
                        </p>
                        <p className={css.fulltime_text}>
                            <span className={css.fulltime_text_span}>
                                Почетное жюри{' '}
                            </span>
                            церемония награждения лауреатов премии состоится в
                            декабре. Все финалисты премии будут приглашены в
                            столицу для получения наград из рук членов почетного
                            жюри и выдающихся гостей премии.
                        </p>
                        <p className={css.fulltime_text}>
                            Все расходы, связанные с логистикой и проживанием
                            участников, оргкомитет премии берет на себя.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
