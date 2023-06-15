import * as T from './types';
import { $host } from 'http/index';

export const getFilterPlaces: T.FilterPlacesTypes = async (q, url) => {
    q = q?.toLowerCase();
    const res = await $host.get(`/api/users/${url}?name=${q}`)
    return res.data
};

export const getEventsPlaces: T.FilterEventsPlaces = async (q) => {
    q = q?.toLowerCase();
    const res = await $host.get(`/api/events/address?subject=${q}`)
    return res.data
};
