import { UserData } from 'components/LoginModal/Login/Login.types';
import { FormType } from 'components/LoginModal/Login/Login.types';

export interface IPhoneForm {
    tel: string;
}

export interface IPhoneFormProps {
    setFormType: (object: FormType) => void;
    setUserData: (data: UserData) => void;
}
