import { create } from 'zustand';
import * as T from 'store/types/userStore.types';

export const useUserStore = create<T.IStoreType>((set) => ({
    user: {
        addressId: 0,
        education: '',
        pk: undefined,
        tel: '',
        img: '',
        name: '',
        surname: '',
        patronymic: '',
        birthday: '',
        email: '',
        gender: 'male',
        addressName: '',
        addressSubject: '',
        educationId: '',
        educationEnd: '',
        speciality: '',
        role: '',
        job: '',
        jobTitle: '',
        likes: [],
        favorites: [],
        events: [],
        createdEvents: [],
        isAuth: false,
    },
    setUser: (user) => set({ user: user }),
}));
