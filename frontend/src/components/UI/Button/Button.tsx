import { useRouter } from 'next/router';
import { CSSProperties, FC, MouseEventHandler, ReactNode } from 'react';

import css from './Button.module.scss';

interface IButtonProps {
    children: ReactNode;
    handleClick?: MouseEventHandler;
    href?: string;
    style?: CSSProperties;
    big?: boolean;
    type?: 'submit' | 'reset' | 'button';
    buttonType?: 'primary' | 'default';
    disabled?: boolean;
}

export const Button: FC<IButtonProps> = ({
    children,
    href,
    big = false,
    style,
    handleClick,
    type,
    buttonType = 'default',
    disabled,
}) => {
    const router = useRouter();

    let className: string = css.button;

    if (big && buttonType !== 'default') {
        className = css.button_primary_big;
    } else if (!big && buttonType === 'primary') {
        className = css.button_primary;
    } else if (big && buttonType === 'default') {
        className = css.big_button;
    }

    return (
        <button
            type={type}
            style={style}
            disabled={disabled}
            className={className.toString()}
            onClick={
                href
                    ? () => router.push(href as string)
                    : handleClick
                    ? (e) => (handleClick ? handleClick(e) : '')
                    : undefined
            }
        >
            {children}
        </button>
    );
};
