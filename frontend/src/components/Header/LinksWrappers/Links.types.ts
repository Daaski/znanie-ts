import { MotionValue } from 'framer-motion';

export interface LinksProps {
    padding?: string;
    boxShadows?: string;
    opacity?: MotionValue;
    setVisible?: (b: boolean) => void;
}

export interface BecomeItemProps {
    id: string;
    img: JSX.Element;
    description: string;
    href: string;
    setVisible?: (b: boolean) => void;
}
