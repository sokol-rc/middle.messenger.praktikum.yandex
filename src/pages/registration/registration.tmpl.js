export const registrationPageTemplate = `
<main class="auth-content layout-container">
	<div class="auth-content__form form-wrapper auth-content__form--main-bg">
		<div class="form-header auth-content__header">
			<h1 class="form-header__title">Регистрация</h1>
		</div>
		<form class="auth-form form form-container" action="">
			<div class="form__two-inputs">
				<div class="form-input">
					<label class="form-input__label" for="regFormFirstname">Имя</label>
					<input class="form-input__input" id="regFormFirstname" type="text" placeholder="Ваше имя">
				</div>
				<div class="form-input">
					<label class="form-input__label" for="regFormLastname">Фамилия</label>
					<input class="form-input__input" id="regFormLastname" type="text" placeholder="Ваша фамилия">
				</div>
			</div>
			<div class="form-input">
				<label class="form-input__label" for="regFormLogin">Логин</label>
				<input class="form-input__input" id="regFormLogin" type="text" placeholder="your-nickname">
			</div>
			<div class="form-input">
				<label class="form-input__label" for="regFormEmail">Email</label>
				<input class="form-input__input" id="regFormEmail" type="email" placeholder="your-email@mail.com">
			</div>
			<div class="form-input">
				<label class="form-input__label" for="regFormPhone">Телефон</label>
				<input class="form-input__input" id="regFormPhone" type="phone" placeholder="+7-911-911-91-91">
			</div>
			<div class="form-input">
				<label class="form-input__label" for="authFormPassword">Пароль</label>
				<input class="form-input__input" id="authFormPassword" type="password" placeholder="пароль">
			</div>
			<div class="form__check policy-check">
				<input class="policy-check__input" id="authFormEmail" type="checkbox">
				<label class="policy-check__label" for="authFormEmail">Оставляя свой email, я принимаю <a href=""
						class="policy-check__link link link--standart">политику конфиденциальности</a></label>
			</div>
			<div class="form__control form-btns form-single-btn">
				<button class="form-btns__submit btn btn--submit-style" type="submit">Зарегистрироваться</button>
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
