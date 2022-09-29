/* eslint-disable */
import Block from 'core/Block';


interface InputProps {
	type: string;
	id: number;
	name: string;
	placeholder?: string;
	validateType?: string;
	onFocus?: () => void;
	onBlur?: () => void;
}

export class InputInner extends Block {
	constructor({ type, name, id, placeholder, validateType, onFocus, onBlur }: InputProps) {
		super({ type, name, id, placeholder, validateType, events: { focus: onFocus, blur: onBlur } });
    }
    static get componentName(): string {
        return 'InputInner';
    }

	protected render(): string {
		const id = this.id;
		return `
			<input
			class="form-input__input"
			id="{{id}}"
			type="{{type}}"
			placeholder="{{placeholder}}"
			name="{{name}}"
			data-validate="{{validateType}}"
			value="">`;
    }
}
