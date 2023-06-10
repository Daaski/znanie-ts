import { create } from 'zustand';
import * as T from 'store/types/userStore.types';

export const useUserStore = create<T.IStoreType>((set) => ({
    user: {
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
        education: '',
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
