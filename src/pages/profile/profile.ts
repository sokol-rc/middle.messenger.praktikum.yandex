import Block from 'core/Block';
import { UserProfileType } from 'reducers/thunkTypes';
import getFormValues, { getAvatarFormValue } from 'utils/formTools';
import { inputValidate, repeatPasswordValidate } from 'utils/validate/validate';
import Patterns from 'utils/validate/validate-pattenrs';
import { ValidationHandlers } from 'utils/validate/validateTypes';

import './profile.css';

export type FormValuesFormData<FormValues> = FormValues & { avatar?: FormData };

type Props = {
    user: Record<string, string>;
    onSubmit: (event: SubmitEvent) => void;
    getUserInfo: () => void;
    goBack: () => void;
    saveUserInfo: (data: {
        data: UserProfileType;
        avatar: FormData | null;
    }) => void;
    personNamePattern: RegExp;
    loginPattern: RegExp;
    emailPattern: RegExp;
    phonePattern: RegExp;
    passwordPattern: RegExp;
} & ValidationHandlers;

export default class ProfilePage extends Block<Props> {
    constructor(props: Props) {
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
            goBack: this.goBack.bind(this),
        });
    }

    protected patterns = Patterns;

    componentDidMount(): void {
        if (this.props.user !== null) {
            this.props.getUserInfo();
        }
    }

    goBack() {
        window.router.back();
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
        let isValidateHasErrors = false;

        const inputsRefs: ValidateInput[] = [
            this.refs.firstNameInputRef,
            this.refs.secondNameInputRef,
            this.refs.loginInputRef,
            this.refs.displayNameInputRef,
            this.refs.emailInputRef,
            this.refs.phoneInputRef,
            this.refs.oldPasswordInputRef,
            this.refs.newPasswordInputRef,
        ];
        const formValues = <UserProfileType>getFormValues(inputsRefs);

        inputsRefs.forEach((inputRef: ValidateInput) => {
            const isValid = this._validateRefs(inputRef);
            if (!isValid) {
                isValidateHasErrors = true;
            }
            this._displayError(isValid, inputRef);
        });

        const matchPassword = repeatPasswordValidate(
            this.refs.oldPasswordInputRef,
            this.refs.newPasswordInputRef
        );

        this._displayError(matchPassword, this.refs.newPasswordInputRef);

        const avatar = getAvatarFormValue('.avatar-input__input');
        if (!isValidateHasErrors) {
            this.props.saveUserInfo({ data: formValues, avatar });
        }
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
							??????: ${this.props.user.firstName || '??????????'}
						</div>
						<div class="person-data__item person-data__second-name">
							??????????????: ${this.props.user.secondName || '??????????'}
						</div>
						<div class="person-data__item person-data__display-name">
							???????????????????????? ??????: ${this.props.user.displayName || '??????????'}
						</div>
						<div class="person-data__item person-data__login">
							??????????: ${this.props.user.login || '??????????'}
						</div>
						<div class="person-data__item person-data__email">
							Email: ${this.props.user.email || '??????????'}
						</div>
						<div class="person-data__item person-data__phone">
							??????????????: ${this.props.user.phone || '??????????'}
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
				label="????????????????" 
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
			label="??????" 
			placeholder=""
			validateOnBlur=validateOnBlur
			validateOnFocus=validateOnFocus
			pattern=personNamePattern
			errorMessage="???????????????? ?? ??????????????????, ?? ??????????????????, ?????? ????????????????????????"
			ref="firstNameInputRef"
		}}}
		{{{Input 
			wrapperClassName="person-data-form__item form-input"
			labelClassName="form-input__label"
			className="form-input__label"
			type="text" 
			name="second_name" 
			label="??????????????" 
			placeholder=""
			validateOnBlur=validateOnBlur
			validateOnFocus=validateOnFocus
			pattern=personNamePattern
			errorMessage="???????????????? ?? ??????????????????, ?? ??????????????????, ?????? ????????????????????????"
			ref="secondNameInputRef"
		}}}
		{{{Input 
			wrapperClassName="person-data-form__item form-input"
			labelClassName="form-input__label"
			className="form-input__label"
			type="text" 
			name="display_name" 
			label="???????????????????????? ??????" 
			validateOnBlur=validateOnBlur
			validateOnFocus=validateOnFocus
			pattern=loginPattern
			errorMessage="???? 3 ???? 20 ????????????????, ????????????????, ??????????, ??????????????:-_"
			placeholder=""
			ref="displayNameInputRef"
		}}}
		{{{Input 
			wrapperClassName="person-data-form__item form-input"
			labelClassName="form-input__label"
			className="form-input__label"
			type="text" 
			name="login" 
			label="??????????" 
			placeholder=""
			validateOnBlur=validateOnBlur
			validateOnFocus=validateOnFocus
			pattern=loginPattern
			errorMessage="???? 3 ???? 20 ????????????????, ????????????????, ??????????, ??????????????:-_"
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
			errorMessage="???? email"
			ref="emailInputRef"
		}}}
		{{{Input 
			wrapperClassName="person-data-form__item form-input"
			labelClassName="form-input__label"
			className="form-input__label"
			type="tel" 
			name="phone" 
			label="??????????????"
			placeholder="" 
			validateOnBlur=validateOnBlur
			validateOnFocus=validateOnFocus
			pattern=phonePattern
			errorMessage="???? 10 ???? 15 ????????????????, ??????????, ?????????? ???????????????????? ?? ??????????"
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
				label="???????????? ????????????"
				placeholder="" 
				validateOnBlur=validateOnBlur
				validateOnFocus=validateOnFocus
				pattern=passwordPattern
				errorMessage="???? 8 ???? 40 ????????????????, 1 ??????????????????, 1 ??????????"
				ref="oldPasswordInputRef"
			}}}
			{{{Input 
				wrapperClassName="person-data-form__item form-input"
				labelClassName="form-input__label"
				className="form-input__label"
				type="password" 
				name="newPassword" 
				label="?????????? ????????????"
				placeholder="" 
				validateOnBlur=validateOnBlur
				validateOnFocus=validateOnFocus
				errorMessage="???????????? ???? ??????????????????"
				ref="newPasswordInputRef"
			}}}
		</div>
		<div class="person-data-form__submit">
			{{{Button
				className="form-btns__submit btn btn--submit-style"
				label="??????????????????"
			}}}
		</div>
			{{/Form}}
		</div>
        {{{Button label="??????????????????" onClick=goBack}}}
	</main>
`;
    }
}
