/* eslint-disable */
import Block from 'core/Block';

interface ButtonProps {
    label: string;
	className: string;
    onClick?: () => void;
}

export class Button extends Block {
	constructor({ label, className = '',  onClick }: ButtonProps) {
		super({ label, className,  events: { click: onClick } });
    }
    static get componentName(): string {
        return 'Button';
    }

	protected render(): string {
        return `<button class="form-btns__submit btn btn--submit-style {{className}}" type="submit">{{label}}</button> `;
    }
}
