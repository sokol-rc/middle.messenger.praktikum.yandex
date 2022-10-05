import Block from 'core/Block';
import { inputValidate, ValidateTypes } from 'utils/validate';

import './input.css';

type ErrorName = 'errorMessage';

type Props = {
    type?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    validateType?: string;
    className?: string;
    setLoginValidateStatus?: () => void;
    passwordsValidate: () => void;
    onBlur: (event: FocusEvent) => void;
    onFocus: () => void;
    setErrorMessage: (props: Record<ErrorName, string>) => void;
    value: string;
    errorMessage: string;
};

export default class Input extends Block<Props> {
    constructor(props: Props) {
        super(props);
        this.setProps({
            onBlur: this.onBlur.bind(this),
            onFocus: this.onFocus.bind(this),
            setErrorMessage: this.setErrorMessage.bind(this),
            passwordsValidate: this.props.passwordsValidate,
            value: '',
            errorMessage: '',
        });
    }

    static get componentName(): string {
        return 'Input';
    }

    onFocus() {
        const inputProps: ValidateInput = this.refs.inputInnerRef.getProps();

        inputValidate(inputProps, this.setErrorMessage.bind(this));

        if (inputProps.validateType === ValidateTypes.REPEAT_PASSWORD) {
            this.props.passwordsValidate();
        }
    }

    onBlur(event: FocusEvent) {
        const currentValue: string = (event.target as HTMLInputElement).value;

        this.setInputValue(currentValue);

        const inputProps: ValidateInput = this.refs.inputInnerRef.getProps();

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
        console.log(props);

        this.refs.errorRef.setProps(props);
    }

    protected render(): string {
        const { id } = this;

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
