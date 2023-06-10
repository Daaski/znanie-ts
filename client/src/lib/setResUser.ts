import { IUser } from 'store/types/userStore.types';

export interface R {
    pk: number;
    phone: string;
    surname: string;
    name: string;
    patronymic: string;
    birthdate: string;
    email: string;
    gender: 'male' | 'female';
    image: string;
    role?: 'user' | 'lector';
    address: {
        pk: number;
        name: string;
        subject: string;
        type: string;
    };
    education: {
        place_pk: string;
        graduated_year: string;
        major: string;
        place: string;
    };
    work: {
        place: string;
        position: string;
    };
}

export function setResUser(r: R, user, setUser: (user: IUser) => void) {
    setUser({
        ...user,
        name: r.name,
        addressName: r?.address?.name ?? '',
        birthday: r?.birthdate,
        patronymic: r?.patronymic,
        gender: r.gender,
        addressId: r?.address?.pk ?? 0,
        addressSubject: r?.address?.subject ?? '',
        educationId: r?.education?.place_pk,
        education: r?.education?.place,
        tel: r.phone,
        surname: r.surname,
        jobTitle: r?.work?.position,
        job: r?.work?.place,
        speciality: r?.education?.major,
        educationEnd: r?.education?.graduated_year,
        email: r?.email,
        role: r.role ?? user.role,
        isAuth: true,
    });
}
