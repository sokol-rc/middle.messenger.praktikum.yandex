import Block from 'core/Block';

import './input.css';

type Props = {
    type?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    pattern?: RegExp;
    className?: string;
    value: string;
    inputType?: string;
    errorMessage: string;
    onFocus?: () => void;
    showError?: () => void;
    clearError?: () => void;
    validateOnBlur: (input: ValidateInput) => void;
    setLoginValidateStatus?: () => void;
    onBlur: (event: FocusEvent) => void;
};

export default class Input extends Block<Props> {
    constructor(props: Props) {
        super(props);
        this.setProps({
            onBlur: this.onBlur.bind(this),
            showError: this.showError.bind(this),
            clearError: this.clearError.bind(this),
            validateOnBlur: this.props.validateOnBlur,
            value: '',
            errorMessage: props.errorMessage,
        });
    }

    static get componentName(): string {
        return 'Input';
    }

    onBlur(event: FocusEvent): void {
        const currentValue: string = (event.target as HTMLInputElement).value;
        if ((event.target as HTMLInputElement).type === 'file') {
            return;
        }

        this.setInputValue(currentValue);
        if (typeof this.props.validateOnBlur === 'function') {
            this.props.validateOnBlur(this);
        }
    }

    setInputValue(currentValue: string) {
        this.refs.inputInnerRef.setProps({
            value: currentValue,
        });
    }

    showError(): void {
        this.refs.errorRef.setProps({ isShowed: true });
    }

    clearError(): void {
        this.refs.errorRef.setProps({ isShowed: false });
    }

    protected render(): string {
        return `
		<div class="{{wrapperClassName}}">
			<label class="{{labelClassName}}" for="${this.id}">${this.props.label}</label>
			{{{InputInner
				id="${this.id}" 
				type="${this.props.type}" 
				className="${this.props.className}"
				placeholder="${this.props.placeholder}" 
				name="${this.props.name}" 
				pattern=pattern
				onBlur=onBlur
				onFocus=onFocus
				inputType="${this.props.inputType}"
				ref="inputInnerRef"
			}}}
			{{{InputError
				errorMessage="${this.props.errorMessage}"
				ref="errorRef"
			}}}
		</div>`;
    }
}
