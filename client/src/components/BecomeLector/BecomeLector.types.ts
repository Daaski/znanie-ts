import { UserFormTypes } from 'components/Profile/UserContent/About/About.types';
import { ErrorsTypes } from 'components/Profile/UserContent/About/About.types';

export interface BecomeLectorTypes extends Omit<UserFormTypes, 'phone'> {}

export interface ErrorLectorsTypes extends ErrorsTypes {
    education: string;
}
