/* eslint-disable */
import Block from 'core/Block';

import './button.css';

interface ButtonProps {
    label: string;
    disable: boolean;
    className: string;
    onClick?: () => void;
}

export class Button extends Block {
    constructor({ ...props }: ButtonProps) {
        super({ ...props, events: { click: props.onClick } });
        const isDisable = props.disable ? '' : 'disable';
    }
    static componentName = 'Button';

    protected render(): string {
        return `<button class="form-btns__submit btn btn--submit-style {{className}}" type="submit" isDisable>{{label}}</button> `;
    }
}
