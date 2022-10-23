import { Console } from 'console';
import Block from 'core/Block';
import { logout } from 'services/auth';
import getFormValues, { getAvatarFormValue } from 'utils/formTools';
import { inputValidate, repeatPasswordValidate } from 'utils/validate/validate';
import Patterns from 'utils/validate/validate-pattenrs';

import './profile.css';

type Props = {
	[x: string]: any;
    user: Record<string, string>;
    onSubmit: (event: SubmitEvent) => void;
    validateOnBlur: (input: ValidateInput) => void;
    validateOnFocus: (input: ValidateInput) => void;
    personNamePattern: RegExp;
    loginPattern: RegExp;
    emailPattern: RegExp;
    phonePattern: RegExp;
    passwordPattern: RegExp;
};

export default class ProfilePage extends Block<Props> {
    constructor(props) {
        super(props);
        this.setProps({
            onSubmit: this.onSubmit.bind(this),
            validateOnBlur: this.validateOnBlur.bind(this),
            validateOnFocus: this.validateOnFocus.bind(this),
            personNamePattern: this.patterns.personNamePattern,
            loginPattern: this.patterns.loginPattern,
            emailPattern: this.patterns.emailPattern,
            phonePattern: this.patterns.phonePattern,
            passwordPattern: this.patterns.passwordPattern,
            user: this.props.user,
        });
    }

    protected patterns = Patterns;

	componentDidMount(): void {
		if (this.props.user !== null) { 
			this.props.getUserInfo();
		}
	}

    validateOnFocus(inputRef: ValidateInput): void {
        let isValid: boolean = true;
        let ref: ValidateInput;

        if (inputRef.getProps().name === 'newPassword') {
            isValid = repeatPasswordValidate(
                this.refs.oldPasswordInputRef,
                this.refs.newPasswordInputRef
            );
            ref = this.refs.newPasswordInputRef;
        } else {
            isValid = this._validateRefs(inputRef);
            ref = inputRef;
        }
        this._displayError(isValid, ref);
    }

    validateOnBlur(inputRef: ValidateInput): void {
        let isValid: boolean = true;
        let ref: ValidateInput;

        if (inputRef.getProps().name === 'newPassword') {
            isValid = repeatPasswordValidate(
                this.refs.oldPasswordInputRef,
                this.refs.newPasswordInputRef
            );
            ref = this.refs.newPasswordInputRef;
        } else {
            isValid = this._validateRefs(inputRef);
            ref = inputRef;
        }
        this._displayError(isValid, ref);
    }

    onSubmit(event: SubmitEvent): void {
        event.preventDefault();

        const inputsRefs: ValidateInput[] = [
            this.refs.firstNameInputRef,
            this.refs.secondNameInputRef,
            this.refs.loginInputRef,
            this.refs.emailInputRef,
            this.refs.phoneInputRef,
            this.refs.oldPasswordInputRef,
            this.refs.newPasswordInputRef,
        ];
        const formValues = getFormValues(inputsRefs);

        inputsRefs.forEach((inputRef: ValidateInput) => {
            const isValid = this._validateRefs(inputRef);
            this._displayError(isValid, inputRef);
        });

        const matchPassword = repeatPasswordValidate(
            this.refs.oldPasswordInputRef,
            this.refs.newPasswordInputRef
        );

        this._displayError(matchPassword, this.refs.newPasswordInputRef);

        console.log(formValues); // вывод в консоль по ТЗ, а вот комментарий запрещен ¯\_(ツ)_/¯

        const avatar = getAvatarFormValue('.avatar-input__input');
        if (avatar) {
            formValues.avatar = avatar;
        }
        this.props.saveUserInfo(formValues);
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
		<main class="profile-page layout-container">
		<div class="profile-page__inner">
			<div class="profile-page__view">
				<div class="profile-page__avatar">
					{{{Avatar image="${this.props.user.avatar}"}}}
				</div>
				<div class="profile-page__data">
					<div class="person-data">
						<div class="person-data__item person-data__first-name">
							Имя: ${this.props.user.firstName || 'пусто'}
						</div>
						<div class="person-data__item person-data__second-name">
							Фамилия: ${this.props.user.secondName || 'пусто'}
						</div>
						<div class="person-data__item person-data__display-name">
							Отображаемое имя: ${this.props.user.displayName || 'пусто'}
						</div>
						<div class="person-data__item person-data__login">
							Логин: ${this.props.user.login || 'пусто'}
						</div>
						<div class="person-data__item person-data__email">
							Email: ${this.props.user.email || 'пусто'}
						</div>
						<div class="person-data__item person-data__phone">
							Телефон: ${this.props.user.phone || 'пусто'}
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
			{{{Input 
				wrapperClassName=""
				labelClassName="avatar-input__label visually-hidden"
				className="avatar-input__input"
				type="file" 
				name="avatar" 
				label="Аватарка" 
				placeholder=""
				ref="avatarInputRef"
			}}}
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
			validateOnBlur=validateOnBlur
			validateOnFocus=validateOnFocus
			pattern=personNamePattern
			errorMessage="латиница и кириллица, с заглавной, без спецсимволов"
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
			validateOnBlur=validateOnBlur
			validateOnFocus=validateOnFocus
			pattern=personNamePattern
			errorMessage="латиница и кириллица, с заглавной, без спецсимволов"
			ref="secondNameInputRef"
		}}}
		{{{Input 
			wrapperClassName="person-data-form__item form-input"
			labelClassName="form-input__label"
			className="form-input__label"
			type="text" 
			name="display_name" 
			label="Отображаемое имя" 
			validateOnBlur=validateOnBlur
			validateOnFocus=validateOnFocus
			pattern=loginPattern
			errorMessage="от 3 до 20 символов, латиница, цифры, символы:-_"
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
			validateOnBlur=validateOnBlur
			validateOnFocus=validateOnFocus
			pattern=loginPattern
			errorMessage="от 3 до 20 символов, латиница, цифры, символы:-_"
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
			validateOnBlur=validateOnBlur
			validateOnFocus=validateOnFocus
			pattern=emailPattern
			errorMessage="не email"
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
			validateOnBlur=validateOnBlur
			validateOnFocus=validateOnFocus
			pattern=phonePattern
			errorMessage="от 10 до 15 символов, цифры, может начинается с плюса"
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
				validateOnBlur=validateOnBlur
				validateOnFocus=validateOnFocus
				pattern=passwordPattern
				errorMessage="от 8 до 40 символов, 1 заглавная, 1 цифра"
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
				validateOnBlur=validateOnBlur
				validateOnFocus=validateOnFocus
				errorMessage="пароли не совпадают"
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
