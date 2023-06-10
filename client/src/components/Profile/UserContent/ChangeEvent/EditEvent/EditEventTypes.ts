import { LectorType, SingleEventResponse } from 'http/types';

export interface EditEventForm
    extends Omit<SingleEventResponse, 'address' | 'start' | 'end' | 'lectors'> {
    address: { id: number; name: string };
    start: Date;
    end: Date;
    lectors: Omit<LectorType, 'place' | 'position'>[];
}

export interface EditEventErrors extends SingleEventResponse {}
