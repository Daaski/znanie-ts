import { IEvent } from 'store/types/userStore.types';

export const getPastOrWillEvents = (
    events: IEvent[],
    when: 'new' | 'passed'
) => {
    return events?.filter((event) => event.status === when);
};
