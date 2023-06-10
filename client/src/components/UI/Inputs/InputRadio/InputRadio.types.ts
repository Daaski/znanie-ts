import { ChangeEventHandler } from 'react';

export interface InputRadioProps {
    name: string;
    label: string;
    value: string[];
    initialValue: string;
    type: string;
    chooseName: string[];
    onChange: (v: string) => void;
}
