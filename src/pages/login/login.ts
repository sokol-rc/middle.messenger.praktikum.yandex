import { debug } from 'console';
import Block from 'core/Block';
import { login, logout } from 'services/auth';
import AuthApi from 'utils/api/auth-api';
import getFormValues from 'utils/formTools';
import { inputValidate } from 'utils/validate/validate';
import Patterns from 'utils/validate/validate-pattenrs';

import './login.css';

type LoginData = {
    login: string;
    password: string;
};

type Props = {
    onSubmit: (event: SubmitEvent) => void;
    validateOnBlur: (input: ValidateInput) => void;
    validateOnFocus: (input: ValidateInput) => void;
    loginPattern: RegExp;
    passwordPattern: RegExp;
    store: any;
    user: any;
    loginFormError: string;
    isLoading: () => boolean;
    onLogin: (loginData: LoginData) => void;
    onLogout: () => void;
};

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
            enableLoader: this.enableLoader.bind(this),
            onLogin: this.onLogin.bind(this),
            onLogout: this.onLogout.bind(this),
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

    enableLoader() {
        this.props.setloginFormError('asdasd');
    }

    disableLoader() {
        this.props.disableLoader();
    }

    onLogout() {
        this.props.doLogout();
    }

    onSubmit(event: SubmitEvent): void {
        event.preventDefault();
        const inputsRefs: ValidateInput[] = [
            this.refs.loginInputRef,
            this.refs.passwordInputRef,
        ];
        let isFormValid: boolean = true;

        const formValues = getFormValues(inputsRefs);

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
{{{Button label="Logout" onClick=onLogout}}}
{{{Button label="enable loader" onClick=enableLoader}}}
{{{Button label="disable loader" onClick=disableLoader}}}
	<div class="auth-content__form form-wrapper auth-content__form--main-bg">
		<div class="form-header auth-content__header">
			<h1 class="form-header__title">Вход</h1>
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
			placeholder="Ваш login" 
			validateOnBlur=validateOnBlur
			validateOnFocus=validateOnFocus
			pattern=loginPattern
			errorMessage="от 3 до 20 символов, латиница, цифры, символы:-_"
			ref="loginInputRef"
		}}}
		{{{Input 
			wrapperClassName="form-input"
			labelClassName="form-input__label"
			className="form-input__label"
			type="password" 
			name="password" 
			label="Пароль" 
			placeholder="пароль" 
			validateOnBlur=validateOnBlur
			validateOnFocus=validateOnFocus
			pattern=passwordPattern
			errorMessage="от 8 до 40 символов, 1 заглавная, 1 цифра"
			ref="passwordInputRef"
		}}}
		<div class="form__check policy-check">
			<input class="policy-check__input" id="authFormPolicy" type="checkbox" name="policy" required>

			<label class="policy-check__label" for="authFormPolicy">Оставляя свой email, я принимаю 
			{{{Link
				href="#"
				label="политику конфиденциальности"
				className="policy-check__link link link--standart"
				target="_blank"
			}}}
			</label>
		</div>
		<div class="form__control form-btns">
			<div class="form-btns__forgot-password">
				{{{Link
					href="#"
					label="Забыли пароль?"
					className="link link--standart"
				}}}
			</div>
			{{{Button 
				label="Войти"
				className="btn btn--submit-style"
				disable=isValidate
			}}}
		</div>
		<div class="form__footer footer form__footer--bg-dark2">
			<div class="form-container footer__container">
				<p class="form__text">
					Нет аккаунта?
				</p>
				{{{Link
					href="#"
					label="Зарегистрироваться"
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
