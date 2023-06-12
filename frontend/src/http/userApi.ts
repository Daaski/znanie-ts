import { $auth, $host } from './index';
import * as T from './types';

export const authToken = async (tel: string, password: string) => {
    try {
        const { refresh, access }: { refresh: string; access: string } =
            await $host
                .post('api/auth/token/', {
                    json: { phone: tel, password: password },
                })
                .json();
        localStorage.setItem('password', password);
        localStorage.setItem('refresh', refresh);
        localStorage.setItem('access', access);
    } catch (e: any) {
        return e.message;
    }
};

export const registerUser: T.RegisterUser = async (
    surname,
    phone,
    name,
    birthdate,
    password
) => {
    try {
        return await $host
            .post('api/users/', {
                json: {
                    phone: phone,
                    password: password,
                    name: name,
                    birthdate: birthdate,
                    surname: surname,
                },
            })
            .json();
    } catch (e: any) {
        return e.message;
    }
};

export const checkPhone: T.checkPhone = async (tel: string) => {
    try {
        const { exist, password }: { exist: boolean; password: string } =
            await $host
                .post('api/users/check_phone/', { json: { phone: tel } })
                .json();
        return { exist, password };
    } catch (e: any) {
        return e.message;
    }
};

export const getUser: T.GetUserTypes = async () => {
    try {
        if (localStorage.getItem('access')) {
            return await $auth.get('api/users/me/').json();
        }
    } catch (e: any) {
        return e.message;
    }
};

export const updateUser: T.UpdateUser = async (
    surname,
    name,
    patronymic,
    birthdate,
    gender,
    address,
    email,
    education,
    work
) => {
    try {
        return await $auth
            .patch('api/users/me/', {
                json: {
                    surname: surname,
                    name: name,
                    patronymic: patronymic,
                    birthdate: birthdate,
                    gender: gender,
                    address: address,
                    email: email,
                    education: education,
                    work: work,
                },
            })
            .json();
    } catch (e: any) {
        return e.message;
    }
};

export const becomeLector: T.BecomeLectorType = async (
    name,
    surname,
    patronymic,
    email,
    birthdate
) => {
    try {
        return await $auth
            .patch('api/users/become_lector/', {
                json: {
                    name,
                    surname,
                    patronymic,
                    email,
                    birthdate,
                },
            })
            .json();
    } catch (e: any) {
        return e.message;
    }
};

export const selectEvent: T.SelectEventType = async (id) => {
    return await $auth.post(`api/users/selected_event/event/${id}/`).json();
};

export const unsubscribeSelectEvent: T.UnSubscribeSelectEventType = async (
    id
) => {
    return await $auth.delete(`api/users/selected_event/event/${id}/`).json();
};

export const updateUserImg: (
    image: FileList
) => Promise<{ image: string }> = async (image) => {
    const formData = new FormData();
    formData.append('image', image.item(0) as Blob);
    return await $auth
        .patch('api/users/upload_image/', { body: formData })
        .json();
};

export const likeEvent: T.LikeEventType = async (id) => {
    return await $auth.post(`api/users/like/event/${id}/`).json();
};

export const unsubscribeLikeEvent: T.UnsubscribeLikeEventType = async (id) => {
    return await $auth.delete(`api/users/like/event/${id}/`).json();
};

export const favoriteEvent: T.SubscribeFavorite = async (id) => {
    return await $auth.post(`api/users/favourite/event/${id}/`).json();
};

export const unsubscribeFavoriteEvent: T.UnsubscribeFavoriteEvent = async (
    id
) => {
    return await $auth.delete(`api/users/favourite/event/${id}/`).json();
};
