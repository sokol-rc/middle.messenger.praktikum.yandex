import Block from 'core/Block';
import getFormValues from 'utils/formTools';
import { inputValidate } from 'utils/validate/validate';
import Patterns from 'utils/validate/validate-pattenrs';
import { ValidationHandlers } from 'utils/validate/validateTypes';

import './login.css';

type LoginData = {
    login: string;
    password: string;
};

type Props = {
    onSubmit: (event: SubmitEvent) => void;
    loginPattern: RegExp;
    passwordPattern: RegExp;
    loginFormError: string;
    isLoading: () => boolean;
    onLogin: (loginData: LoginData) => void;
    doLogin: (loginData: LoginData) => void;
    onLogout: () => void;
} & ValidationHandlers;

export default class LoginPage extends Block<Props> {
    constructor(props: Props) {
        super(props);
        this.setProps({
            onSubmit: this.onSubmit.bind(this),
            validateOnBlur: this.validateOnBlur.bind(this),
            validateOnFocus: this.validateOnFocus.bind(this),
            loginPattern: this.patterns.loginPattern,
            passwordPattern: this.patterns.passwordPattern,
            loginFormError: props.loginFormError,
            onLogin: this.onLogin.bind(this),
        });
    }

    protected patterns = Patterns;

    componentDidMount() {}

    validateOnFocus(inputRef: ValidateInput): void {
        const isValid = this._validateRefs(inputRef);
        this._displayError(isValid, inputRef);
    }

    validateOnBlur(inputRef: ValidateInput): void {
        const isValid = this._validateRefs(inputRef);
        this._displayError(isValid, inputRef);
    }

    onLogin(loginData: LoginData) {
        this.props.doLogin(loginData);
    }

    onSubmit(event: SubmitEvent): void {
        event.preventDefault();
        const inputsRefs: ValidateInput[] = [
            this.refs.loginInputRef,
            this.refs.passwordInputRef,
        ];
        let isFormValid: boolean = true;

        const formValues: LoginData = getFormValues(inputsRefs);

        inputsRefs.forEach((inputRef: ValidateInput) => {
            const isValid = this._validateRefs(inputRef);
            if (!isValid) {
                isFormValid = false;
            }
            this._displayError(isValid, inputRef);
        });

        if (isFormValid) {
            this.onLogin(formValues);
        }
    }

    private _validateRefs(inputRef: ValidateInput) {
        return inputValidate(inputRef.refs.inputInnerRef.getProps());
    }

    private _displayError(isValid: boolean, inputRef: ValidateInput) {
        if (!isValid) {
            inputRef.getProps().showError();
        } else {
            inputRef.getProps().clearError();
        }
    }

    render() {
        return `
<main class="auth-content layout-container">
	<div class="auth-content__form form-wrapper auth-content__form--main-bg">
		<div class="form-header auth-content__header">
			<h1 class="form-header__title">????????</h1>
		</div>
		{{#Form
			className="auth-form form form-container"
			onSubmit=onSubmit
			ref="formRef"
		}}
		{{{Loader isLoading=isLoading}}}
		<div class="form__error">${this.props.loginFormError}</div>
		{{{Input 
			wrapperClassName="form-input"
			labelClassName="form-input__label"
			className="form-input__label"
			type="text" 
			name="login" 
			label="Login" 
			placeholder="?????? login" 
			validateOnBlur=validateOnBlur
			validateOnFocus=validateOnFocus
			pattern=loginPattern
			errorMessage="???? 3 ???? 20 ????????????????, ????????????????, ??????????, ??????????????:-_"
			ref="loginInputRef"
		}}}
		{{{Input 
			wrapperClassName="form-input"
			labelClassName="form-input__label"
			className="form-input__label"
			type="password" 
			name="password" 
			label="????????????" 
			placeholder="????????????" 
			validateOnBlur=validateOnBlur
			validateOnFocus=validateOnFocus
			pattern=passwordPattern
			errorMessage="???? 8 ???? 40 ????????????????, 1 ??????????????????, 1 ??????????"
			ref="passwordInputRef"
		}}}
		<div class="form__check policy-check">
			<input class="policy-check__input" id="authFormPolicy" type="checkbox" name="policy" required>

			<label class="policy-check__label" for="authFormPolicy">???????????????? ???????? email, ?? ???????????????? 
			{{{Link
				href="#"
				label="???????????????? ????????????????????????????????????"
				className="policy-check__link link link--standart"
				target="_blank"
			}}}
			</label>
		</div>
		<div class="form__control form-btns">
			<div class="form-btns__forgot-password">
				{{{Link
					href="#"
					label="???????????? ?????????????"
					className="link link--standart"
				}}}
			</div>
			{{{Button 
				label="??????????"
				className="btn btn--submit-style"
				disable=isValidate
			}}}
		</div>
		<div class="form__footer footer form__footer--bg-dark2">
			<div class="form-container footer__container">
				<p class="form__text">
					?????? ?????????????????
				</p>
				{{{Link
					href="/sign-up"
					label="????????????????????????????????????"
					className="link link--standart"
				}}}
			</div>
		</div>
		{{/Form}}
	</div>
</main>
`;
    }
}
