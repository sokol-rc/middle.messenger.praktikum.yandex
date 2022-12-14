import Block from 'core/Block';
import getFormValues from 'utils/formTools';
import { inputValidate } from 'utils/validate/validate';
import Patterns from 'utils/validate/validate-pattenrs';
import { ValidationHandlers } from 'utils/validate/validateTypes';

import '../login/login.css';
import './registration.css';

export type RegistrationData = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
    password: string;
};

type Props = {
    onSubmit: (event: SubmitEvent) => void;
    doRegistrtation: (registrationData: RegistrationData) => void;
    personNamePattern: RegExp;
    loginPattern: RegExp;
    emailPattern: RegExp;
    phonePattern: RegExp;
    passwordPattern: RegExp;
    registrationFormError: string;
    isLoading: boolean;
} & ValidationHandlers;

export default class RegistrationPage extends Block<Props> {
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
        });
    }

    protected patterns = Patterns;

    validateOnFocus(inputRef: ValidateInput): void {
        const isValid = this._validateRefs(inputRef);
        this._displayError(isValid, inputRef);
    }

    validateOnBlur(inputRef: ValidateInput): void {
        const isValid = this._validateRefs(inputRef);
        this._displayError(isValid, inputRef);
    }

    onSubmit(event: SubmitEvent): void {
        event.preventDefault();

        const inputsRefs: ValidateInput[] = [
            this.refs.firstNameInputRef,
            this.refs.secondNameInputRef,
            this.refs.loginInputRef,
            this.refs.emailInputRef,
            this.refs.phoneInputRef,
            this.refs.passwordInputRef,
        ];
        let isFormValid: boolean = true;
        const formValues: RegistrationData = getFormValues(inputsRefs);

        inputsRefs.forEach((inputRef: ValidateInput) => {
            const isValid = this._validateRefs(inputRef);
            if (!isValid) {
                isFormValid = false;
            }
            this._displayError(isValid, inputRef);
        });

        if (isFormValid) {
            this.props.doRegistrtation(formValues);
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
		<main class="auth-content layout-container">
			<div class="auth-content__form form-wrapper auth-content__form--main-bg">
				<div class="form-header auth-content__header">
					<h1 class="form-header__title">??????????????????????</h1>
				</div>
				{{#Form
					className="auth-form form form-container"
					onSubmit=onSubmit
					ref="formRef"
				}}
				{{{Loader isLoading=isLoading}}}
				<div class="form__error">${this.props.registrationFormError}</div>
					<div class="form__two-inputs">
					{{{Input 
						wrapperClassName="form-input"
						labelClassName="form-input__label"
						className="form-input__label"
						type="text" 
						name="first_name" 
						label="??????" 
						placeholder="???????? ??????" 
						validateOnBlur=validateOnBlur
						validateOnFocus=validateOnFocus
						pattern=personNamePattern
						errorMessage="???????????????? ?? ??????????????????, ?? ??????????????????, ?????? ????????????????????????"
						ref="firstNameInputRef"
					}}}
					{{{Input 
						wrapperClassName="form-input"
						labelClassName="form-input__label"
						className="form-input__label"
						type="text" 
						name="second_name" 
						label="??????????????" 
						placeholder="???????? ??????????????" 
						validateOnBlur=validateOnBlur
						validateOnFocus=validateOnFocus
						pattern=personNamePattern
						errorMessage="???????????????? ?? ??????????????????, ?? ??????????????????, ?????? ????????????????????????"
						ref="secondNameInputRef"
					}}}
				</div>
				{{{Input 
					wrapperClassName="form-input"
					labelClassName="form-input__label"
					className="form-input__label"
					type="text" 
					name="login" 
					label="??????????" 
					placeholder="?????? login" 
					validateOnBlur=validateOnBlur
					validateOnFocus=validateOnFocus
					pattern=loginPattern
					errorMessage="???? 3 ???? 20 ????????????????, ????????????????, ??????????, ??????????????:-_"
					ref="loginInputRef"
				}}}
				{{{Input 
					wrapperClassName="form-input"
					labelClassName="form-input__label"
					className="form-input__label"
					type="text" 
					name="email" 
					label="Email" 
					placeholder="your-email@mail.com" 
					validateOnBlur=validateOnBlur
					validateOnFocus=validateOnFocus
					pattern=emailPattern
					errorMessage="???? email"
					ref="emailInputRef"
				}}}
				{{{Input 
					wrapperClassName="form-input"
					labelClassName="form-input__label"
					className="form-input__label"
					type="phone" 
					name="phone" 
					label="??????????????" 
					placeholder="+7-911-911-91-91" 
					validateOnBlur=validateOnBlur
					validateOnFocus=validateOnFocus
					pattern=phonePattern
					errorMessage="???? 10 ???? 15 ????????????????, ??????????, ?????????? ???????????????????? ?? ??????????"
					ref="phoneInputRef"
				}}}
				{{{Input 
					wrapperClassName="form-input"
					labelClassName="form-input__label"
					className="form-input__label"
					type="password" 
					name="password" 
					label="????????????" 
					placeholder="????????????" 
					validateOnBlur=validateOnBlur
					validateOnFocus=validateOnFocus
					pattern=passwordPattern
					errorMessage="???? 8 ???? 40 ????????????????, 1 ??????????????????, 1 ??????????"
					ref="passwordInputRef"
				}}}
				<div class="form__check policy-check">
					<input class="policy-check__input" id="authFormEmail" type="checkbox">
					<label class="policy-check__label" for="authFormEmail">???????????????? ???????? email, ?? ???????????????? 
					{{{Link
						href="#"
						label="???????????????? ????????????????????????????????????"
						className="policy-check__link link link--standart"
						target="_blank"
					}}}
					</label>
				</div>
				<div class="form__control form-btns form-single-btn">
					{{{Button 
						label="????????????????????????????????????" 
						className="btn btn--submit-style" 
					}}}
				</div>
				<div class="form__footer footer form__footer--bg-dark2">
					<div class="form-container footer__container">
						<p class="form__text">
							???????? ???????????????
						</p>
						{{{Link
							href="/"
							label="??????????"
							className="link link--standart"
						}}}
					</div>
				</div>
				{{/Form}}
			</div>
		</main>
`;
    }
}
