export interface IEmailForm {
    email: string;
    password: string;
}

export interface IEmailFormProps {
    setUserData: ({ email: string }) => void;
    setFormType: (
        type: 'checkingPinPhone' | 'checkingPinEmail' | 'phone' | 'email' | ''
    ) => void;
}
