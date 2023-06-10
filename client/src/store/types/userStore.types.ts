export interface LectorType {
    pk: string;
    name: string;
    surname: string;
    place: string;
    position: string;
    image: string;
}
export interface IEvent {
    pk: number;
    name: string;
    start: string;
    end: string;
    about: string;
    description: string;
    address: { pk: number; name: string; subject: string; type: string };
    image: string;
    status: 'past' | 'will';
    lectors: LectorType[];
}

export interface IUser {
    pk: number;
    isAuth: boolean;
    tel: string;
    email: string;
    name: string;
    surname: string;
    img: string;
    patronymic: string;
    gender: 'male' | 'female';
    role: 'user' | 'lector';
    addressId: number;
    addressName: string;
    addressSubject: string;
    birthday: string;
    job: string;
    jobTitle: string;
    educationId: string;
    education: string;
    educationEnd: string;
    speciality: string;
    likes: IEvent[];
    favorites: IEvent[];
    events: IEvent[];
    createdEvents: IEvent[];
}

export interface IStoreType {
    user: IUser;
    setUser: (user: IUser) => void;
}
