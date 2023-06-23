import { $auth, $host } from './index';
import * as T from './types';

export const authToken = async (tel: string, password: string) => {
    try {
        const res =
            await $host
                .post('/api/auth/token/', {
                    phone: tel, password: password
                });
        const { refresh, access }: { refresh: string; access: string } = res.data;
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
    password,
) => {
    try {
        const res = await $host
            .post('/api/users/', {

                    phone: phone,
                    password: password,
                    name: name,
                    birthdate: birthdate,
                    surname: surname,

            });
        return res.data;
    } catch (e: any) {
        return e.message;
    }
};

export const checkPhone: T.checkPhone = async (tel: string) => {
    try {
        const res =
            await $host
                .post('/api/users/check_phone/', { phone: tel });

        const { exist, password }: { exist: boolean; password: string } = res.data;
        return { exist, password };
    } catch (e: any) {
        return e.message;
    }
};

export const getUser: T.GetUserTypes = async () => {
    try {
        if (localStorage.getItem('access')) {
            const res = await $auth.get('/api/users/me/');
            return res.data;
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
    work,
) => {
    try {
        const res = await $auth
            .patch('/api/users/me/', {

                    surname: surname,
                    name: name,
                    patronymic: patronymic,
                    birthdate: birthdate,
                    gender: gender,
                    address: address,
                    email: email,
                    education: education,
                    work: work,

            });
        return res.data;
    } catch (e: any) {
        return e.message;
    }
};

export const becomeLector: T.BecomeLectorType = async (
    name,
    surname,
    patronymic,
    email,
    birthdate,
) => {
    try {
        const res = await $auth
            .patch('/api/users/become_lector/', {

                    name,
                    surname,
                    patronymic,
                    email,
                    birthdate,

            });
        return res.data;
    } catch (e: any) {
        return e.message;
    }
};

export const selectEvent: T.SelectEventType = async (id) => {
    const res = await $auth.post(`/api/users/selected_event/event/${id}/`);
    return res.data;
};

export const unsubscribeSelectEvent: T.UnSubscribeSelectEventType = async (
    id,
) => {
    const res = await $auth.delete(`/api/users/selected_event/event/${id}/`);
    return res.data;
};

export const updateUserImg: (
    image: FileList,
) => Promise<{ image: string }> = async (image) => {
    const formData = new FormData();
    formData.append('image', image.item(0) as Blob);
    const res = await $auth
        .patch('/api/users/upload_image/',  formData);
    return res.data;
};

export const likeEvent: T.LikeEventType = async (id) => {
    const res = await $auth.post(`/api/users/like/event/${id}/`);
    return res.data;
};

export const unsubscribeLikeEvent: T.UnsubscribeLikeEventType = async (id) => {
    const res = await $auth.delete(`/api/users/like/event/${id}/`)
    return res.data
};

export const favoriteEvent: T.SubscribeFavorite = async (id) => {
    const res =  await $auth.post(`/api/users/favourite/event/${id}/`)
    return res.data
};

export const unsubscribeFavoriteEvent: T.UnsubscribeFavoriteEvent = async (
    id,
) => {
    const res =  await $auth.delete(`/api/users/favourite/event/${id}/`)
    return res.data
};
