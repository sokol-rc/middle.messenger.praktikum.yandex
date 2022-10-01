/* eslint-disable */
import Block from 'core/Block';
import { getFormValues } from 'utils/formTools';
import { formValidate } from 'utils/validate';

export class RegistrationPage extends Block {
    constructor() {
        super();
        this.setProps({
            handleClick: this.handleClick.bind(this),
        });
    }

	handleClick(event: MouseEvent): void {

		event.preventDefault();
		
		const firstNameProps: ValidateInputProps = this.refs.firstNameInputRef.getProps();
		const secondNameProps: ValidateInputProps = this.refs.secondNameInputRef.getProps();
		const loginInputProps: ValidateInputProps = this.refs.loginInputRef.getProps();
		const emailInputProps: ValidateInputProps = this.refs.emailInputRef.getProps();
		const phoneInputProps: ValidateInputProps = this.refs.phoneInputRef.getProps();
		const passwordInputProps: ValidateInputProps = this.refs.passwordInputRef.getProps();

		formValidate([firstNameProps, secondNameProps, loginInputProps, emailInputProps, phoneInputProps, passwordInputProps]);

		const formValues = getFormValues([firstNameProps, secondNameProps, loginInputProps, emailInputProps, phoneInputProps, passwordInputProps]);
		console.log(formValues); // нужно вывести по ТЗ
	}

    render() {
        return `
		<main class="auth-content layout-container">
			<div class="auth-content__form form-wrapper auth-content__form--main-bg">
				<div class="form-header auth-content__header">
					<h1 class="form-header__title">Регистрация</h1>
				</div>
				<form class="auth-form form form-container" action="">
					<div class="form__two-inputs">
						{{{Input 
							type="text" 
							name="first_name" 
							label="Имя" 
							placeholder="Ваше имя" 
							validateType="personName"
							ref="firstNameInputRef"
						}}}
						{{{Input 
							type="text" 
							name="second_name" 
							label="Фамилия" 
							placeholder="Ваша фамилия" 
							validateType="personName"
							ref="secondNameInputRef"
						}}}
					</div>
					{{{Input 
						type="text" 
						name="login" 
						label="Логин" 
						placeholder="Ваш login" 
						validateType="login"
						ref="loginInputRef"
					}}}
					{{{Input 
						type="text" 
						name="email" 
						label="Email" 
						placeholder="your-email@mail.com" 
						validateType="email"
						ref="emailInputRef"
					}}}
					{{{Input 
						type="phone" 
						name="phone" 
						label="Телефон" 
						placeholder="+7-911-911-91-91" 
						validateType="phone"
						ref="phoneInputRef"
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
						<input class="policy-check__input" id="authFormEmail" type="checkbox">
						<label class="policy-check__label" for="authFormEmail">Оставляя свой email, я принимаю <a href=""
								class="policy-check__link link link--standart">политику конфиденциальности</a></label>
					</div>
					<div class="form__control form-btns form-single-btn">
						{{{Button 
							label="Зарегистрироваться" 
							disable=isValidate
							onClick=handleClick
						}}}
					</div>
					<div class="form__footer form__footer--bg-dark2">
						<div class="form-container">
							<p class="form__text">
								Есть аккаунт? <a class="link link--standart" href="#">Войти</a>
							</p>
						</div>
		
					</div>
				</form>
			</div>
		</main>
`;
    }
}
