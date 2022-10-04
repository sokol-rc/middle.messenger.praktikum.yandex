/* eslint-disable */
import Block from 'core/Block';
import { getFormValues } from 'utils/formTools';
import { formValidate } from 'utils/validate';

import './login.css';

export class LoginPage extends Block {
    constructor() {
        super();
        this.setProps({
            onSubmit: this.onSubmit.bind(this),
        });
    }

    onSubmit(event: SubmitEvent): void {
        event.preventDefault();

		const loginInput: ValidateInput =
            this.refs.loginInputRef;
        const passwordInput: ValidateInput =
            this.refs.passwordInputRef;

        formValidate([loginInput, passwordInput]);

        const formValues = getFormValues([loginInput, passwordInput]);
        console.log(formValues);
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
			label="Email" 
			placeholder="Ваш login" 
			validateType="login"
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
			validateType="password"
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
		<div class="form__footer form__footer--bg-dark2">
			<div class="form-container">
				<p class="form__text">
					Нет аккаунта? <a class="link link--standart" href="#">Зарегистрироваться</a>
				</p>
			</div>
		</div>
		{{/Form}}
	</div>
</main>
`;
    }
}

// <form class="auth-form form form-container" action="">
// 			{{{Input
// 				wrapperClassName="form-input"
// 				labelClassName="form-input__label"
// 				className="form-input__label"
// 				type="text"
// 				name="login"
// 				label="Email"
// 				placeholder="Ваш login"
// 				validateType="login"
// 				ref="loginInputRef"
// 			}}}
// 			{{{Input
// 				wrapperClassName="form-input"
// 				labelClassName="form-input__label"
// 				className="form-input__label"
// 				type="password"
// 				name="password"
// 				label="Пароль"
// 				placeholder="пароль"
// 				validateType="password"
// 				ref="passwordInputRef"
// 			}}}

// 			<div class="form__check policy-check">
// 				<input class="policy-check__input" id="authFormPolicy" type="checkbox" name="policy" required>

// 				<label class="policy-check__label" for="authFormPolicy">Оставляя свой email, я принимаю <a href=""
// 						class="policy-check__link link link--standart">политику конфиденциальности</a></label>
// 				<div class="error-message"></div>
// 			</div>
// 			<div class="form__control form-btns">
// 				<div class="form-btns__forgot-password">
// 					<a class="link link--standart" href="#">Забыли пароль?</a>
// 				</div>
// 				{{{Button
// 					label="Войти"
// 					className="btn btn--submit-style"
// 					disable=isValidate
// 					onClick=handleClick
// 				}}}
// 			</div>
// 			<div class="form__footer form__footer--bg-dark2">
// 				<div class="form-container">
// 					<p class="form__text">
// 						Нет аккаунта? <a class="link link--standart" href="#">Зарегистрироваться</a>
// 					</p>
// 				</div>

// 			</div>
// 		</form>
