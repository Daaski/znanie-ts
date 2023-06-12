import { InputProps } from 'components/UI/Inputs/Input/Input.types';

export interface InputDateProps
    extends Pick<InputProps, 'name' | 'autoFocus' | 'type'> {
    value: Date;
    onBlur: <T>(e: T) => void;
    onChange: (value: Date) => void;
    alwaysShowMask: boolean | undefined;
    mask: string;
    placeholder: string;
    label: string;
    disabled?: boolean;
    handleError?: string | undefined;
}
