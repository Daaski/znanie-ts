import { ChangeEventHandler, CSSProperties, FocusEvent } from 'react';

export interface InputProps {
    type: string;
    autoFocus?: boolean;
    value: string;
    name: string;
    handleError: string | undefined | boolean;
    onBlur: (
        event: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>
    ) => void;
    onChange:
        | ChangeEventHandler<HTMLInputElement>
        | ChangeEventHandler<HTMLTextAreaElement>;
    label: string;
    placeholder?: string;
    style?: CSSProperties;
    maxLength?: string;
    autoComplete?: string;
    disabled?: boolean;
}
