import { CSSProperties } from 'react';

export interface BigEventProps {
    id?: number;
    title: string;
    description?: string;
    href?: string;
    start?: string;
    end?: string;
    address?: { pk: number; name: string; subject: string; type: string };
    backgroundSrc?: string;
    backgroundImg: string;
    alt: string;
    style?: CSSProperties;
    becomeSmaller?: boolean;
    onClick?: () => void;
}
