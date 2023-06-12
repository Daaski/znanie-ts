import Arrow from '/public/images/Arrows/simpleArrow.svg';

import css from 'components/HomePage/Lectors/ArrowsButtons/ArrowsButtons.module.scss';

interface NextButtonProps {
    onClick: () => void;
}

export const NextButton = function ArrowButton({ onClick }: NextButtonProps) {
    return (
        <div onClick={onClick} className={css.arrows_wrapper}>
            <Arrow className={css.next} />
        </div>
    );
};
