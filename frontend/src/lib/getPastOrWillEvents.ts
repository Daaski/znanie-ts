import { IEvent } from 'store/types/userStore.types';

type GetPastOrWillEventsType = (
    events: IEvent[],
    when: 'new' | 'passed'
) => IEvent[];

export const getPastOrWillEvents: GetPastOrWillEventsType = (events, when) => {
    return events?.filter((event) => event.status === when);
};
