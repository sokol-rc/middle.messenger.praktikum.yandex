/* eslint-disable */
import Block from 'core/Block';

import './form.css';

interface FormProps {
	className?: string;
    onSubmit?: () => void;
}

export class Form extends Block {
    constructor({ ...props }: FormProps) {
        super({ ...props, events: { submit: props.onSubmit } });
       
    }
    static componentName = 'Form';

	protected render(): string {

        return `<form class="{{className}}" action="">
		<div data-cont="1"></div>

	</form> `;
    }
}
