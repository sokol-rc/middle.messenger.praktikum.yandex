/* eslint-disable */
import Block from 'core/Block';

export class LoginPage extends Block {
	constructor() { 
		super();

		this.setProps({
			handleClick: (event: MouseEvent): void => { 
				event.preventDefault();
				const isValid: boolean = validate(form);
				console.log(isValid);
				console.log(event)
			}
		})
	}
    render() {
        return `
		<main class="auth-content layout-container">
	<div class="auth-content__form form-wrapper auth-content__form--main-bg">
		<div class="form-header auth-content__header">
			<h1 class="form-header__title">Вход</h1>
		</div>
		<form class="auth-form form form-container" action="">
			<div class="form-input">
				<label class="form-input__label" for="authFormEmail">Email</label>
				<input class="form-input__input" id="authFormEmail" type="email" placeholder="your-email@mail.com" name="login">
			</div>
			<div class="form-input">
				<label class="form-input__label" for="authFormPassword">Пароль</label>
				<input class="form-input__input" id="authFormPassword" type="password" placeholder="пароль" name="password">
			</div>
			<div class="form__check policy-check">
				<input class="policy-check__input" id="authFormPolicy" type="checkbox">
				<label class="policy-check__label" for="authFormPolicy">Оставляя свой email, я принимаю <a href=""
						class="policy-check__link link link--standart">политику конфиденциальности</a></label>
			</div>
			<div class="form__control form-btns">
				<div class="form-btns__forgot-password">
					<a class="link link--standart" href="#">Забыли пароль?</a>
				</div>
				{{{Button label="Войти" class="qwe" onClick=handleClick}}}
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
