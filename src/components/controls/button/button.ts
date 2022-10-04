/* eslint-disable */
import Block from 'core/Block';

import './button.css';

interface ButtonProps {
    label?: string;
    disable?: boolean;
	className?: string;
    onClick?: () => void;
}

export class Button extends Block {
    constructor({ ...props }: ButtonProps) {
        super({ ...props, events: { click: props.onClick } });
       
    }
    static componentName = 'Button';

	protected render(): string {

        return `<button class="{{className}}" type="submit">${this.props.label}</button> `;
    }
}
