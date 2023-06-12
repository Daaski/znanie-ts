import { IEvent } from 'store/types/userStore.types';

export const checkEvent = (events: IEvent[], pk: number): boolean => {
    return !!events?.find((e) => e.pk === pk);
};
