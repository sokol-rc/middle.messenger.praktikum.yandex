/* eslint-disable */
import Block from 'core/Block';

interface InputProps {
    type: string;
    id: number;
	name: string;
	className?: string;
    placeholder?: string;
    validateType?: string;
    onBlur?: () => void;
    onFocus?: () => void;
}

export class InputInner extends Block {
    constructor({...props}: InputProps) {
        super({...props, events: {
                blur: props.onBlur,
                focus: props.onFocus,
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
			class="${this.props.className}"
			id="${this.props.id}"
			type="${this.props.type}"
			placeholder="${this.props.placeholder}"
			name="${this.props.name}"
			data-validate="${this.props.validateType}"
			value="${this.props.value}">`;
    }
}
