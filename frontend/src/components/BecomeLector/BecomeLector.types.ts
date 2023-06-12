import { UserFormTypes } from 'components/Profile/UserContent/About/About.types';
import { ErrorsTypes } from 'components/Profile/UserContent/About/About.types';

export type BecomeLectorTypes = Omit<UserFormTypes, 'phone'>;

export interface ErrorLectorsTypes extends ErrorsTypes {
    education: string;
}
