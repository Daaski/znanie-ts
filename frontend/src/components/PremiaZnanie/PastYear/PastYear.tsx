import VideoSvg from './icons/video.svg';
import PastArrow from '/public/images/Arrows/circleArrow.svg';

import css from './PastYear.module.scss';

export const PastYear = () => {
    return (
        <div id={'memories'} className={css.pastyear_layout}>
            <div className={css.pastyear}>
                <div className={css.pastyear_header}>
                    <h2 className={css.pastyear_header_title}>
                        как это было в 2021
                    </h2>
                    <p className={css.pastyear_header_text}>
                        7-го декабря 2021 года в Московском театре мюзикла
                        прошла церемония награждения лучших просветителей года.
                        Самые достойные из 103 номинантов, попавших в
                        шорт-листы, получили главную просветительскую премию
                        «Знание».
                    </p>
                </div>
                <div className={css.pastyear_main}>
                    <a href="#" className={css.pastyear_main_video}>
                        <div className={css.video_play_wrapper}>
                            <VideoSvg className={css.video_play} />
                        </div>
                    </a>
                    <div className={css.pastyear_main_laureates}>
                        <div className={css.laureates_header_wrapper}>
                            <div className={css.laureates_title_wrapper}>
                                <h2 className={css.laureates_title}>
                                    Лауреаты и номинанты
                                </h2>
                                <p className={css.laureates_text}>
                                    в шорт-лист попало 103 номинанта
                                </p>
                            </div>
                            <PastArrow className={css.laureates_arrow} />
                        </div>
                        <h3 className={css.laureates_amount}>103</h3>
                    </div>
                    <div className={css.pastyear_main_application}>
                        <div className={css.application_collected_wrapper}>
                            <h2 className={css.application_collected_title}>
                                заявок собрано{' '}
                            </h2>
                            <h3 className={css.application_collected_amount}>
                                3156
                            </h3>
                        </div>
                        <hr className={css.application_border} />
                        <div className={css.application_laureates}>
                            <h2 className={css.application_laureates_title}>
                                лауреатов
                            </h2>
                            <h3 className={css.application_laureates_amount}>
                                29
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
