import { SingleEventWithLectors } from 'http/types';

export interface EventProps {
    event: SingleEventWithLectors;
}

export type LectorSwiperProps = EventProps

export interface UserMenuProps {
    past: boolean
    event: SingleEventWithLectors
}