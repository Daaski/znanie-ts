import Arrow from '/public/images/Arrows/simpleArrow.svg';

import css from 'components/HomePage/Lectors/ArrowsButtons/ArrowsButtons.module.scss';

interface PrevButtonProps {
    onClick: () => void;
}

export const PrevButton = function ArrowButton({ onClick }: PrevButtonProps) {
    return (
        <div onClick={onClick} className={css.arrows_wrapper}>
            <Arrow className={css.prev} />
        </div>
    );
};
