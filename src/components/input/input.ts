/* eslint-disable */
import Block from 'core/Block';
import { nanoid } from 'nanoid';
import { inputValidate } from 'utils/validate';

interface InputProps {
    type: string;
    name: string;
    label?: string;
    placeholder?: string;
    validateType?: string;
    className?: string;
    setLoginValidateStatus?: () => void;
}

export class Input extends Block {
    constructor({ ...props }: InputProps) {
        super({ ...props, events: {} });
        this.setProps({
            onBlur: this.onBlur.bind(this),
            onInput: this.onInput.bind(this),
            setErrorMessage: this.setErrorMessage.bind(this),
            value: '',
        });
    }
    static get componentName(): string {
        return 'Input';
    }

    onInput(e: InputEvent): void {}

    onBlur(event: FocusEvent): void {
        this.setProps({ value: (event.target as HTMLInputElement).value });
        this.refs.inputInnerRef.setProps({
            value: (event.target as HTMLInputElement).value,
        });

        const inputProps: ValidateInputProps =
            this.refs.inputInnerRef.getProps();

        inputValidate(inputProps, this.setErrorMessage.bind(this));
    }

    setErrorMessage(props: { errorMessage: string }): void {
        this.refs.errorRef.setProps(props);
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
				onInput=onInput
				ref="inputInnerRef"
			}}}
			{{{InputError
				errorMessage="${this.props.errorMessage}"
				ref="errorRef"
			}}}
		</div>`;
    }
}
