import { LectorType, SingleEventResponse } from 'http/types';

export interface EditEventForm
    extends Omit<
        SingleEventResponse,
        'address' | 'start' | 'end' | 'lectors' | 'image'
    > {
    address: { id: number; name: string };
    start: Date;
    end: Date;
    lectors: Omit<LectorType, 'place' | 'position'>[];
    image: { name: string } | string;
}

export type EditEventErrors = SingleEventResponse;
