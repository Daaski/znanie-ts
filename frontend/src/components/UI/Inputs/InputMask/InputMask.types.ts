import { InputProps } from 'components/UI/Inputs/Input/Input.types';

export interface InputMaskProps
    extends Pick<
        InputProps,
        'value' | 'name' | 'autoFocus' | 'onBlur' | 'type' | 'handleError'
    > {
    onChange: (value: string) => void;
    alwaysShowMask: boolean | undefined;
    mask: string;
    placeholder: string;
    label: string;
    maskPlaceholder?: string;
    autoComplete?: string;
    disabled?: boolean;
}
