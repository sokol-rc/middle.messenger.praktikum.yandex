/* eslint-disable */
import Block from 'core/Block';

interface InputProps {
    type: string;
    id: number;
    name: string;
    placeholder?: string;
    validateType?: string;
    onBlur?: () => void;
    onFocus?: () => void;
}

export class InputInner extends Block {
    constructor({
        type,
        name,
        id,
        placeholder,
        validateType,
        onBlur,
        onFocus,
    }: InputProps) {
        super({
            type,
            name,
            id,
            placeholder,
            validateType,
            events: {
                blur: onBlur,
                focus: onFocus,
            },
		});
		this.setProps({value: ''})
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
			value="{{value}}">`;
    }
}
