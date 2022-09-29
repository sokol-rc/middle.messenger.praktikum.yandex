/* eslint-disable */
import Block from 'core/Block';
import { nanoid } from 'nanoid';

interface InputProps {
	type: string;
	name: string;
	label?: string;
	placeholder?: string;
	validateType?: string;
    className?: string;
	onFocus?: () => void;
	onBlur?: () => void;
}

export class Input extends Block {
	constructor({ type, name, label, placeholder, validateType, className, onFocus, onBlur }: InputProps) {
		super({ type, name, label, placeholder, validateType, className, events: {} });
		this.setProps({
			onBlur: onBlur,
			onFocus: onFocus,
		})

    }
    static get componentName(): string {
        return 'Input';
	}

	protected render(): string {
		const id = this.id;
		return `
		<div class="form-input {{className}}">
			<label class="form-input__label" for="${id}">{{label}}</label>
			{{{InputInner
				id="${id}" 
				type="{{type}}" 
				placeholder="{{placeholder}}" 
				name="{{name}}" 
				validateType="{{validateType}}"
				onBlur=onBlur
				onFocus=onFocus
			}}}
			<div class="error-message"></div>
		</div>`;
    }
}
