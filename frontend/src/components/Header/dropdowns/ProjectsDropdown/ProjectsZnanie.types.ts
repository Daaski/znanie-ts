import { MotionValue } from 'framer-motion';

export interface ProjectsZnanieProps {
    padding?: string;
    boxShadow?: string;
    opacity?: MotionValue<string>;
    setVisible?: (b: boolean) => void;
}
