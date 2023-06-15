import { IEvent } from 'store/types/userStore.types';

export type checkPhone = (
    tel: string
) => Promise<{ exist: boolean; password: string }>;

export type UpdateUser = (
    surname: string,
    name: string,
    patronymic: string,
    birthdate: string,
    gender: 'male' | 'female',
    address: number,
    email: string,
    education: {
        place: number;
        graduated_year: string;
        major: string;
    },
    work: {
        place: string;
        position: string;
    }
) => Promise<{
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
        pk: number;
        graduated_year: string;
        major: string;
        place: string;
    };
    work: {
        place: string;
        position: string;
    };
}>;

export type RegisterUser = (
    name: string,
    surname: string,
    phone: string,
    password: string,
    birthdate: string
) => Promise<{
    name: string;
    surname: string;
    phone: string;
    password: string;
    birthdate: string;
}>;

export type GetUserTypes = () => Promise<{
    phone: string;
    surname: string;
    name: string;
    patronymic: string;
    birthdate: string;
    gender: 'male' | 'female';
    role: 'user' | 'lector';
    image: string;
    work_place: string;
    work_position: string;
    education_graduated_year: string;
    education_pk: number;
    education_major: string;
    education_place: string;
    pk: number;
    address_pk: string;
    address_name: string;
    address_subject: string;
    email: string;
    likes: IEvent[];
    favourites: IEvent[];
    selected_events: IEvent[];
    created_events: IEvent[];
}>;

export interface LectorType {
    pk: string;
    name: string;
    surname: string;
    place: string;
    position: string;
    image: string;
}

export type GetFilterLectors = (q?: string) => Promise<LectorType[]>;

export type GetLector = (id: string) => Promise<LectorType>

export type GetFilterFullNameLectors = (
    fullname?: string
) => Promise<LectorType[]>;

export type FilterPlacesTypes = (
    q: string,
    url: `${string}/`
) => Promise<{ pk: number; name: string; subject: string; type: string }[]>;

export type FilterEventsPlaces = (
    q?: string
) => Promise<{ pk: number; subject: string }[]>;

export interface EventsResponse {
    count: number;
    total_pages: number;
    current_page: number;
    results: IEvent[];
}

export type GetFilterEvents = (
    page?: number,
    address?: string,
    start?: string,
    end?: string
) => Promise<EventsResponse>;

export type SingleEventResponse = {
    pk: number;
    name: string;
    about: string;
    description: string;
    start: string;
    end: string;
    address: { pk: number; name: string; subject: string; type: string };
    status: 'new' | 'passed';
    image: string;
    lectors: number[];
};

export interface SingleEventWithLectors
    extends Omit<SingleEventResponse, 'lectors'> {
    lectors: LectorType[];
}

export interface GetSingleEvent {
    (id: number): Promise<SingleEventWithLectors>;
}

export type CreateEvent = (
    name: string,
    about: string,
    description: string,
    start: Date,
    end: Date,
    address: string,
    image: File,
    lectors: string[]
) => Promise<SingleEventResponse>;

export type UpdateEvent = (
    pk: number,
    name: string,
    about: string,
    description: string,
    start: Date,
    end: Date,
    address: string,
    image: File,
    lectors: string[]
) => ReturnType<CreateEvent>;

export type DeleteEvent = (pk: number) => Promise<SingleEventWithLectors[]>;

export type BecomeLectorType = (
    name: string,
    surname: string,
    patronymic: string,
    email: string,
    birthdate: string
) => Promise<{
    role: 'lector';
}>;

export type SelectedEventsResponse = IEvent[];

export type SelectEventType = (id: number) => Promise<SelectedEventsResponse>;

export type UnSubscribeSelectEventType = SelectEventType;

export type LikeEventType = SelectEventType;

export type UnsubscribeLikeEventType = SelectEventType;

export type SubscribeFavorite = LikeEventType;

export type UnsubscribeFavoriteEvent = LikeEventType;
