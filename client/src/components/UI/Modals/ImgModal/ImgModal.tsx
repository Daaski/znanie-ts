import { ChangeEventHandler, forwardRef } from 'react';
import Exit from 'components/Header/Menu/icons/Escape.svg';

import css from './ImgModal.module.scss';

interface ImgModalProps {
    setVisible: (b: boolean) => void;
    tabletBreak: boolean;
    handleChangeFile: ChangeEventHandler<HTMLInputElement>;
}

export const ImgModal = forwardRef(function ImgModal(
    props: ImgModalProps,
    ref
) {
    const onLoadClick = () => {
        ref.current?.click();
    };

    return (
        <div
            onClick={() => props.setVisible(false)}
            className={css.change_img_background}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={css.change_img_container}
            >
                <Exit
                    onClick={() => props.setVisible(false)}
                    className={css.exit_button}
                />
                <div className={css.change_img}>
                    <div className={css.change_img_content}>
                        <h2 className={css.change_img_title}>
                            Загрузка новой фотографии
                        </h2>
                        <p className={css.change_img_text}>
                            Вы можете загрузить изображение в формате JPEG или
                            PNG. Максимальный размер файла: 1 мб.
                        </p>
                        <div className={css.button_wrapper}>
                            <input
                                onChange={props.handleChangeFile}
                                ref={ref}
                                accept="image/jpeg, image/png"
                                className={css.input_img}
                                type="file"
                                alt="Отправить"
                            />
                            <button
                                type="button"
                                onClick={onLoadClick}
                                className={
                                    props.tabletBreak
                                        ? css.button_primary
                                        : css.button_primary_big
                                }
                            >
                                Загрузить изображение
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
