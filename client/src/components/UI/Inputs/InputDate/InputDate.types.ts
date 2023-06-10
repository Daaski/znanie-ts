import { InputProps } from 'components/UI/Inputs/Input/Input.types.ts';

export interface InputDateProps
    extends Pick<InputProps, 'name' | 'autoFocus' | 'type'> {
    value: Date;
    onBlur: () => void;
    onChange: (value: Date) => void;
    alwaysShowMask: boolean | undefined;
    mask: string;
    placeholder: string;
    label: string;
    disabled?: boolean;
    handleError?: string | undefined;
}
