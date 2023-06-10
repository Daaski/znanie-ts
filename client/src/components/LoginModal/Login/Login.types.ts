export type UserData = { tel: string; exists: boolean; password: string };

export type FormType =
    | 'checkingPinPhone'
    | 'registerPinPhone'
    | 'completeRegister'
    | 'phone'
    | 'email'
    | '';
