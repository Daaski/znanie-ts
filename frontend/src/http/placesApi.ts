import * as T from './types';
import { $host } from 'http/index';

export const getFilterPlaces: T.FilterPlacesTypes = async (q, url) => {
    q = q?.toLowerCase();
    return await $host.get(`api/users/${url}?name=${q}`).json();
};

export const getEventsPlaces: T.FilterEventsPlaces = async (q) => {
    q = q?.toLowerCase();
    return await $host.get(`api/events/address?subject=${q}`).json();
};
