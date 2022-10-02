/* eslint-disable */
import Block from 'core/Block';
import { inputValidate, ValidateTypes } from 'utils/validate';

import './input.css';

interface InputProps {
    type: string;
    name: string;
    label?: string;
    placeholder?: string;
    validateType?: string;
    className?: string;
    setLoginValidateStatus?: () => void;
    passwordsValidate?: () => void;
}

export class Input extends Block {
    constructor({ ...props }: InputProps) {
        super({ ...props, events: {} });
        this.setProps({
            onBlur: this.onBlur.bind(this),
            onFocus: this.onFocus.bind(this),
            setErrorMessage: this.setErrorMessage.bind(this),
            value: '',
        });
    }
    static get componentName(): string {
        return 'Input';
    }

    onFocus(event: FocusEvent): void | undefined {
        const inputProps: ValidateInputProps =
            this.refs.inputInnerRef.getProps();
        const currentValue: string = (event.target as HTMLInputElement).value;

        //чтобы не было ререндера сразу
        if (
            typeof inputProps.value === 'undefined' ||
            inputProps.value === currentValue
        ) {
            return;
		}

		this.setInputValue(currentValue);

		inputValidate(inputProps, this.setErrorMessage.bind(this));
		
		if (inputProps.validateType === ValidateTypes.REPEAT_PASSWORD) { 
			this.props.passwordsValidate();
		}
    }

	onBlur(event: FocusEvent): void {
		const currentValue: string = (event.target as HTMLInputElement).value;

		this.setInputValue(currentValue);

        const inputProps: ValidateInputProps =
            this.refs.inputInnerRef.getProps();

		inputValidate(inputProps, this.setErrorMessage.bind(this));
		
		if (inputProps.validateType === ValidateTypes.REPEAT_PASSWORD) { 
			this.props.passwordsValidate();
		}
    }

    setInputValue(currentValue: string) {
        this.refs.inputInnerRef.setProps({
            value: currentValue,
        });
    }

    setErrorMessage(props: { errorMessage: string }): void {
        this.refs.errorRef.setProps(props);
    }

    protected render(): string {
		const id = this.id;
		
        return `
		<div class="{{wrapperClassName}}">
			<label class="{{labelClassName}}" for="${id}">${this.props.label}</label>
			{{{InputInner
				id="${id}" 
				type="${this.props.type}" 
				className="${this.props.className}"
				placeholder="${this.props.placeholder}" 
				name="${this.props.name}" 
				validateType="${this.props.validateType}"
				onBlur=onBlur
				onFocus=onFocus
				ref="inputInnerRef"
			}}}
			{{{InputError
				errorMessage="${this.props.errorMessage}"
				ref="errorRef"
			}}}
		</div>`;

        // return `
		// <div class="form-input {{className}}">
		// 	<label class="form-input__label" for="${id}">{{label}}</label>
		// 	{{{InputInner
		// 		id="${id}" 
		// 		type="{{type}}" 
		// 		placeholder="{{placeholder}}" 
		// 		name="{{name}}" 
		// 		validateType="{{validateType}}"
		// 		onBlur=onBlur
		// 		onFocus=onFocus
		// 		ref="inputInnerRef"
		// 	}}}
		// 	{{{InputError
		// 		errorMessage="${this.props.errorMessage}"
		// 		ref="errorRef"
		// 	}}}
		// </div>`;
    }
}
