import { MotionValue } from 'framer-motion';
import { IEvent } from 'store/types/userStore.types';

export interface LinksProps {
    padding?: string;
    boxShadows?: string;
    opacity?: MotionValue;
    setVisible?: (b: boolean) => void;
}
