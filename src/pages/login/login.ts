/* eslint-disable */
import Block from 'core/Block';
import { getFormValues } from 'utils/formTools';
import {
    formValidate,
    inputValidate,
    showErrors,
    showSuccess,
    showValidateResult,
} from 'utils/validate';

export class LoginPage extends Block {
    constructor() {
        super();
        this.setProps({
			handleClick: this.handleClick.bind(this),
        });
    }

	handleClick(event: MouseEvent): void {

		event.preventDefault();
		
		const loginProps: ValidateInputProps = this.refs.loginInputRef.getProps();
		const PasswordProps: ValidateInputProps = this.refs.passwordInputRef.getProps();

		formValidate([loginProps, PasswordProps]);

		const formValues = getFormValues([loginProps, PasswordProps]);
		console.log(formValues); // нужно вывести по ТЗ
    }

    render() {
        return `
<main class="auth-content layout-container">
	<div class="auth-content__form form-wrapper auth-content__form--main-bg">
		<div class="form-header auth-content__header">
			<h1 class="form-header__title">Вход</h1>
		</div>
		<form class="auth-form form form-container" action="">
			{{{Input 
				type="text" 
				name="login" 
				label="Email" 
				placeholder="Ваш login" 
				validateType="login"
				ref="loginInputRef"
			}}}
			{{{Input 
				type="password" 
				name="password" 
				label="Пароль" 
				placeholder="пароль" 
				validateType="password"
				ref="passwordInputRef"
			}}}

			<div class="form__check policy-check">
				<input class="policy-check__input" id="authFormPolicy" type="checkbox" name="policy" required>

				<label class="policy-check__label" for="authFormPolicy">Оставляя свой email, я принимаю <a href=""
						class="policy-check__link link link--standart">политику конфиденциальности</a></label>
				<div class="error-message"></div>
			</div>
			<div class="form__control form-btns">
				<div class="form-btns__forgot-password">
					<a class="link link--standart" href="#">Забыли пароль?</a>
				</div>
				{{{Button 
					label="Войти" 
					class="qwe" 
					disable=isValidate
					onClick=handleClick
				}}}
			</div>
			<div class="form__footer form__footer--bg-dark2">
				<div class="form-container">
					<p class="form__text">
						Нет аккаунта? <a class="link link--standart" href="#">Зарегистрироваться</a>
					</p>
				</div>

			</div>
		</form>
	</div>
</main>
`;
    }
}
