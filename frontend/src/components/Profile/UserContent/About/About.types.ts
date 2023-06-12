export interface UserFormTypes {
    name: string;
    surname: string;
    patronymic: string;
    gender: 'male' | 'female';
    birthdate: Date;
    address: { id?: number; name: string; subject?: string };
    email: string;
    phone: string;
    job: string;
    jobTitle: string;
    education: { id?: number; name: string };
    educationEnd: string;
    speciality: string;
}

export interface ErrorsTypes {
    name: string;
    surname: string;
    patronymic: string;
    gender: string;
    birthdate: string;
    address: string;
    email: string;
    phone: string;
    job: string;
    jobTitle: string;
    education: string;
    educationEnd: string;
    speciality: string;
}
