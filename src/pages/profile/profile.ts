import Block from 'core/Block';
import getFormValues from 'utils/formTools';
import { formValidate, repeatPasswordValidate } from 'utils/validate';

import './profile.css';

type Props = {
    onSubmit: (event: SubmitEvent) => void;
    passwordsValidate: () => void;
};

export default class ProfilePage extends Block<Props> {
    constructor() {
        super();
        this.setProps({
            onSubmit: this.onSubmit.bind(this),
            passwordsValidate: this.passwordsValidate.bind(this),
        });
    }

    passwordsValidate() {
        const oldPasswordInput: ValidateInput = this.refs.oldPasswordInputRef;
        const newPasswordInput: ValidateInput = this.refs.newPasswordInputRef;
        repeatPasswordValidate(oldPasswordInput, newPasswordInput);
    }

    onSubmit(event: SubmitEvent): void {
        event.preventDefault();

        const firstNameInput: ValidateInput = this.refs.firstNameInputRef;
        const secondNameInput: ValidateInput = this.refs.secondNameInputRef;
        const displayNameInput: ValidateInput = this.refs.displayNameInputRef;
        const loginInput: ValidateInput = this.refs.loginInputRef;
        const emailInput: ValidateInput = this.refs.emailInputRef;
        const phoneInput: ValidateInput = this.refs.phoneInputRef;
        const oldPasswordInput: ValidateInput = this.refs.oldPasswordInputRef;
        const newPasswordInput: ValidateInput = this.refs.newPasswordInputRef;

        formValidate([
            firstNameInput,
            secondNameInput,
            displayNameInput,
            loginInput,
            emailInput,
            phoneInput,
            oldPasswordInput,
        ]);

        repeatPasswordValidate(oldPasswordInput, newPasswordInput);

        const formValues = getFormValues([
            firstNameInput,
            secondNameInput,
            displayNameInput,
            loginInput,
            emailInput,
            phoneInput,
            oldPasswordInput,
            newPasswordInput,
        ]);
        console.log(formValues);
    }

    render() {
        return `
		<main class="profile-page layout-container">
		<div class="profile-page__inner">
			<div class="profile-page__view profile-page__view--hidden">
				<div class="profile-page__avatar">
					{{{Avatar}}}
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
			{{#Form
				className="profile-page__form person-data-form profile-page__form--opened"
				onSubmit=onSubmit
				ref="formRef"
			}}
			<div class="person-data-form__avatar avatar-input">
			{{{Avatar}}}
			<label class="avatar-input__label visually-hidden" for="personFormAvatar">Аватарка</label>
			<input class="avatar-input__input" name="avatar" id="personFormAvatar" type="file" value="">
		</div>
		<div class="person-data-form__person-data">
		{{{Input 
			wrapperClassName="person-data-form__item form-input"
			labelClassName="form-input__label"
			className="form-input__label"
			type="text" 
			name="first_name" 
			label="Имя" 
			placeholder=""
			validateType="personName"
			ref="firstNameInputRef"
		}}}
		{{{Input 
			wrapperClassName="person-data-form__item form-input"
			labelClassName="form-input__label"
			className="form-input__label"
			type="text" 
			name="second_name" 
			label="Фамилия" 
			placeholder=""
			validateType="personName"
			ref="secondNameInputRef"
		}}}
		{{{Input 
			wrapperClassName="person-data-form__item form-input"
			labelClassName="form-input__label"
			className="form-input__label"
			type="text" 
			name="display_name" 
			label="Отображаемое имя" 
			validateType="login"
			placeholder=""
			ref="displayNameInputRef"
		}}}
		{{{Input 
			wrapperClassName="person-data-form__item form-input"
			labelClassName="form-input__label"
			className="form-input__label"
			type="text" 
			name="login" 
			label="Логин" 
			placeholder=""
			validateType="login"
			ref="loginInputRef"
		}}}
		{{{Input 
			wrapperClassName="person-data-form__item form-input"
			labelClassName="form-input__label"
			className="form-input__label"
			type="email" 
			name="email" 
			label="Email"
			placeholder="" 
			validateType="email"
			ref="emailInputRef"
		}}}
		{{{Input 
			wrapperClassName="person-data-form__item form-input"
			labelClassName="form-input__label"
			className="form-input__label"
			type="tel" 
			name="phone" 
			label="Телефон"
			placeholder="" 
			validateType="phone"
			ref="phoneInputRef"
		}}}
		</div>
		<div class="privacy-data-form">
			{{{Input 
				wrapperClassName="person-data-form__item form-input"
				labelClassName="form-input__label"
				className="form-input__label"
				type="password" 
				name="oldPassword" 
				label="Старый пароль"
				placeholder="" 
				validateType="password"
				ref="oldPasswordInputRef"
			}}}
			{{{Input 
				wrapperClassName="person-data-form__item form-input"
				labelClassName="form-input__label"
				className="form-input__label"
				type="password" 
				name="newPassword" 
				label="Новый пароль"
				placeholder="" 
				validateType="repeatPassword"
				passwordsValidate=passwordsValidate
				ref="newPasswordInputRef"
			}}}
		</div>
		<div class="person-data-form__submit">
			{{{Button
				className="form-btns__submit btn btn--submit-style"
				label="Сохранить"
			}}}
		</div>
			{{/Form}}
		</div>
	</main>
`;
    }
}
