import * as T from './types';
import { $auth, $host } from 'http/index';
import lectors from 'pages/lectors';
import { IEvent } from 'store/types/userStore.types';
import { UpdateEvent } from './types';

export const getFilterEvents: T.GetFilterEvents = async (
    page = 1,
    address = '',
    start = '',
    end = ''
) => {
    const searchParams = new URLSearchParams();
    searchParams.set('address', address);
    searchParams.set('start', start);
    searchParams.set('end', end);
    searchParams.set('page', page.toString());

    return await $host
        .get(`/api/events`, {
            searchParams: searchParams,
        })
        .json();
};

export const getSingleEvent: T.GetSingleEvent = async (id) => {
    return await $host.get('/api/events/' + id).json();
};

export const createEvent: T.CreateEvent = async (
    name,
    about,
    description,
    start,
    end,
    address,
    image,
    lectors
) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('about', about);
    formData.append('description', description);
    formData.append('start', JSON.stringify(start).slice(1, 11));
    formData.append('end', JSON.stringify(end).slice(1, 11));
    formData.append('address', address);
    formData.append('image', image);
    for (let i = 0; i < lectors.length; i++) {
        formData.append('lectors', lectors[i]);
    }

    return await $auth.post('/api/events/create/', { body: formData }).json();
};

export const createPermissionEvent: (pk: number) => Promise<IEvent[]> = async (
    pk
) => {
    return await $auth.post(`/api/users/created_event/event/${pk}/`).json();
};

export const updateEvent: UpdateEvent = async (
    pk,
    name,
    about,
    description,
    start,
    end,
    address,
    image,
    lectors
) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('about', about);
    formData.append('description', description);
    formData.append('start', JSON.stringify(start).slice(1, 11));
    formData.append('end', JSON.stringify(end).slice(1, 11));
    formData.append('address', address);
    {
        image.size ? formData.append('image', image) : null;
    }
    for (let i = 0; i < lectors.length; i++) {
        formData.append('lectors', lectors[i]);
    }

    return await $auth
        .patch(`/api/events/${pk}/update/`, { body: formData })
        .json();
};

export const deleteEvent: T.DeleteEvent = async (pk) => {
    return await $auth.delete(`/api/events/${pk}/delete`).json();
};

export const deletePermissionEvent: (pk: number) => Promise<void> = async (
    pk
) => {
    return await $auth.delete(`/api/users/created_event/event/${pk}/`).json();
};
