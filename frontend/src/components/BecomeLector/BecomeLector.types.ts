import { UserFormTypes } from 'components/Profile/UserContent/About/About.types';
import { ErrorsTypes } from 'components/Profile/UserContent/About/About.types';
import { IUser } from 'store/types/userStore.types';

export type BecomeLectorTypes = Omit<UserFormTypes, 'phone'>;

export interface ErrorLectorsTypes extends ErrorsTypes {
    education: string;
}

export interface IBecomeLectorProps {
    user: IUser;
    setUser: (user: IUser) => void;
}