/* eslint-disable */
import Block from 'core/Block';
import { getFormValues } from 'utils/formTools';
import { formValidate, showErrors, showSuccess } from 'utils/validate';

export class LoginPage extends Block {
    constructor() {
        super();
        this.setProps({
			handleClick: this.handleClick.bind(this),
			onBlur: this.onBlur.bind(this),
			onFocus: this.onFocus.bind(this),
        });
	}
	
	onBlur(event: Event): void { 

	}

	onFocus(event: FocusEvent): void { 

	}

    handleClick(event: MouseEvent): void {
        event.preventDefault();
        const formElement = document.querySelector(
            '.auth-form'
		) as HTMLFormElement;
		const formValues = getFormValues(formElement);
		console.log(formValues);
        const validation = formValidate(formElement);

        if (
            validation.error !== 0 &&
            typeof validation.elements !== 'undefined'
		) {
            showErrors(formElement, validation.elements);
		} else {
            showSuccess(formElement);
        }
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
				type="email" 
				name="login" 
				label="Email" 
				value=""
				placeholder="your-email@mail.com" 
				validateType="login"
				onBlur=onBlur
				onFocus=onFocus
			}}}
			{{{Input 
				type="password" 
				name="password" 
				value=""
				label="Пароль" 
				placeholder="пароль" 
				validateType="password"
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
