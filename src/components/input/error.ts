/* eslint-disable */
import Block from 'core/Block';
interface InputErrorProps {
	errorMessage: string;
	}

export class InputError extends Block {
    constructor({...props}: InputErrorProps) {
		super({ ...props });
		this.setProps({errorMessage: '',})
    }
    static componentName = 'InputError';

    protected render(): string {
        return `
		<div class="error-message">${this.props.errorMessage}</div>`;
    }
}
