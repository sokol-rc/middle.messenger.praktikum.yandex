import Block from 'core/Block';
import getFormValues from 'utils/formTools';
import { inputValidate } from 'utils/validate';

import './login.css';

type Props = {
    onSubmit: (event: SubmitEvent) => void;
    validateOnBlur: (input: ValidateInput) => void;
    loginPattern: RegExp;
    passwordPattern: RegExp;
};

export default class LoginPage extends Block<Props> {
    constructor() {
        super();
        this.setProps({
            onSubmit: this.onSubmit.bind(this),
            validateOnBlur: this.validateOnBlur.bind(this),
            loginPattern: this.patterns.loginPattern,
            passwordPattern: this.patterns.passwordPattern,
        });
    }

    inputsRefs: ValidateInput[] = [this.refs.loginInputRef, this.refs.passwordInputRef];

    protected patterns = {
        loginPattern: /^(?=.*[a-zA-Z-_])[0-9a-zA-Z_-]{3,20}$/,
        passwordPattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\s\S]{8,40}$/,
    };

    validateOnFocus(input: ValidateInput): void {
        this._displayError(input);
	}
	
	validateOnBlur(input: ValidateInput): void {
        this._displayError(input);
    }

    onSubmit(event: SubmitEvent): void {
        event.preventDefault();

		const formValues = getFormValues(this.inputsRefs);
		
		this.inputsRefs.forEach((inputRef: ValidateInput) => { 
			this._displayError(inputRef);
		})

        console.log(formValues); // вывод в консоль по ТЗ, а вот комментарий запрещен ¯\_(ツ)_/¯
    }

    private _displayError(inputRef: ValidateInput) {
            const isValid: boolean = inputValidate(
                inputRef.refs.inputInnerRef.getProps()
            );

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
			<h1 class="form-header__title">Вход</h1>
		</div>
		{{#Form
			className="auth-form form form-container"
			onSubmit=onSubmit
			ref="formRef"
		}}
		{{{Input 
			wrapperClassName="form-input"
			labelClassName="form-input__label"
			className="form-input__label"
			type="text" 
			name="login" 
			label="Login" 
			placeholder="Ваш login" 
			validateOnBlur=validateOnBlur
			validateType="login"
			pattern=loginPattern
			errorMessage="Логин не валидный"
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
			validateType="password"
			pattern=passwordPattern
			errorMessage="Пароль не валидный"
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
