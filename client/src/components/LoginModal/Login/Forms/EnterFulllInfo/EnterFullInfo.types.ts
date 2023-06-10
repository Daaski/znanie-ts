export interface EnterFullInfoProps {
    data: { tel: string; exists: boolean };
    handleVisibility: () => void;
}

export interface FormikData {
    tel: string;
    exists: boolean;
    password: string;
    name: string;
    surname: string;
    birthdate: Date;
}
