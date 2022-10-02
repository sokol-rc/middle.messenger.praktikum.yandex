export const profileTemplate: string = `
<main class="profile-page layout-container">
	<div class="profile-page__inner">
		<div class="profile-page__view profile-page__view--hidden">
			<div class="profile-page__avatar">
				{{> avatar}}
			</div>
			<div class="profile-page__data">
				<div class="person-data">
					<div class="person-data__item person-data__first-name">
						Имя: Евгений
					</div>
					<div class="person-data__item person-data__second-name">
						Фамилия: Соколовский
					</div>
					<div class="person-data__item person-data__display-name">
						Отображаемое имя: sokoljd872ews
					</div>
					<div class="person-data__item person-data__login">
						Логин: sokoljd872ews
					</div>
					<div class="person-data__item person-data__email">
						Email: cokol-rc@yandex.ru
					</div>
					<div class="person-data__item person-data__phone">
						Телефон: +7-911-911-91-91
					</div>
				</div>
			</div>
		</div>

		<form class="profile-page__form person-data-form" action="">
			<div class="person-data-form__avatar avatar-input">
				{{> avatar}}
				<label class="avatar-input__label visually-hidden" for="personFormAvatar">Аватарка</label>
				<input class="avatar-input__input" name="avatar" id="personFormAvatar" type="file" value="">
			</div>
			<div class="person-data-form__person-data">
				<div class="person-data-form__item form-input">
					<label class="form-input__label" for="personFormFirstName">Имя</label>
					<input class="form-input__input" name="first_name" id="personFormFirstName" type="text" value="">
				</div>
				<div class="person-data-form__item form-input">
					<label class="form-input__label" for="personFormLastName">Фамилия</label>
					<input class="form-input__input" name="second_name" id="personFormLastName" type="text" value="">
				</div>
				<div class="person-data-form__item form-input">
					<label class="form-input__label" for="personFormDisplayName">Отображаемое имя</label>
					<input class="form-input__input" name="display_name" id="personFormDisplayName" type="text"
						value="">
				</div>
				<div class="person-data-form__item form-input">
					<label class="form-input__label" for="personFormLogin">Логин</label>
					<input class="form-input__input" name="login" id="personFormLogin" type="text" value="">
				</div>
				<div class="person-data-form__item form-input">
					<label class="form-input__label" for="personFormEmail">Email</label>
					<input class="form-input__input" name="email" id="personFormEmail" type="email" inputmode="email"
						value="">
				</div>
				<div class="person-data-form__item form-input">
					<label class="form-input__label" for="personFormPhone">Phone</label>
					<input class="form-input__input" name="phone" id="personFormPhone" type="tel" inputmode="tel"
						value="">
				</div>
			</div>
			<div class="privacy-data-form">
				<div class="privacy-data-form__item form-input">
					<label class="form-input__label" for="personFormOldPass">Старый пароль</label>
					<input class="form-input__input" name="oldPassword" id="personFormOldPass" type="password" value="">
				</div>
				<div class="privacy-data-form__item form-input">
					<label class="form-input__label" for="personFormNewPass">Новый пароль</label>
					<input class="form-input__input" name="newPassword" id="personFormNewPass" type="password" value="">
				</div>
			</div>
			<div class="person-data-form__submit">
				<button class="form-btns__submit btn btn--submit-style" type="submit">Сохранить</button>
			</div>
		</form>

	</div>
</main>
`;
