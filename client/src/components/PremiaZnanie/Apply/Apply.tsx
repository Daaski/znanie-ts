import { v4 as uuidv4 } from 'uuid';

import { NominationItem } from './nominationItem';
import nominations from './data';

import css from './Apply.module.scss';


export const Apply = () => {
    return (
        <section id={'nominations'} className={css.apply_layout_bg}>
            <video className={css.apply_layout_bg_video} autoPlay muted loop>
                <source
                    src={'/videos/PremiaZnanie/luxary-darknes.mp4'}
                    type="video/mp4"
                />
            </video>
            <div className={css.apply_layout_wrapper}>
                <div className={css.apply_wrapper}>
                    <div className={css.apply_header_wrapper}>
                        <div className={css.apply_title_wrapper}>
                            <h2 className={css.apply_title}>Подать заявку</h2>
                            <p className={css.apply_text}>
                                Подайте заявку в релевантную вашей
                                просветительской деятельности номинацию. Краткое
                                описание каждой из них можно найти в карточках,
                                расположенных ниже. В случае возникновения
                                затруднений с выбором номинации, вы можете
                                обратиться к{' '}
                                <a className={css.apply_text_link} href="#">
                                    прошлогодним заявкам финалистов.
                                </a>
                            </p>
                        </div>
                        <button className={css.apply_button}>
                            Подать заявку
                        </button>
                    </div>
                    <ul className={css.apply_awards_wrapper}>
                        {nominations.map((nomination) => (
                            <NominationItem
                                key={nomination.id}
                                {...nomination}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};
