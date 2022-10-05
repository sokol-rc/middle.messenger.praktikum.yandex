export enum ValidateTypes {
    LOGIN = 'login',
    PERSON_NAME = 'personName',
    EMAIL = 'email',
    PHONE = 'phone',
    PASSWORD = 'password',
    REPEAT_PASSWORD = 'repeatPassword',
    MESSAGE = 'message',
}

const isInputValid = (
    value: string,
    regTemplate: RegExp,
    errorText: string,
    inputName: string = 'Поле'
): string => {

    if (value.length === 0) {
        return `${inputName} не может быть пустым`;
    }
    const reg = new RegExp(regTemplate);
    return reg.test(value) ? '' : errorText;
};

export const inputValidate = (
    inputProps: ValidateInput,
    setErrorMessage: (props: { errorMessage: string }) => void
): string => {
    const type: string = inputProps.validateType;
    const { value } = inputProps;

    let errorText: string = '';
    let inputName: string = '';
    let regTemplate: RegExp = /^&/;
    let needValidate: boolean = true;

    switch (type) {
        case ValidateTypes.LOGIN:
            regTemplate = /^(?=.*[a-zA-Z-_])[0-9a-zA-Z_-]{3,20}$/;
            inputName = 'Логин';
            errorText = 'от 3 до 20 символов, латиница, цифры, символы:-_';
            break;
        case ValidateTypes.PASSWORD:
            regTemplate = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\s\S]{8,40}$/;
            inputName = 'Пароль';
            errorText = 'от 8 до 40 символов, 1 заглавная, 1 цифра';
            break;
        case ValidateTypes.PERSON_NAME:
            regTemplate = /^[A-ZА-ЯЁ][0-9a-zA-Zа-яёА-ЯЁ-]*$/;
            inputName = 'Поле';
            errorText = 'латиница и кириллица, с заглавной, без спецсимволов';
            break;
        case ValidateTypes.EMAIL:
            regTemplate = /^[a-zA-Z0-9-.]+[@]{1}[a-z0-9]+[.][a-z]+$/;
            inputName = 'Email';
            errorText = 'не email';
            break;
        case ValidateTypes.PHONE:
            regTemplate = /^[+|\d]{10,15}$/;
            inputName = 'Телефон';
            errorText = 'от 10 до 15 символов, цифры, может начинается с плюса';
            break;
        case ValidateTypes.MESSAGE:
            regTemplate = /^[\s\S]{1,}$/;
            inputName = 'Сообщение';
            errorText = 'не должно быть пустым';
            break;
        default:
            needValidate = false;
            break;
    }

	if (needValidate) {
        errorText = isInputValid(value, regTemplate, errorText, inputName);
    }
    setErrorMessage({ errorMessage: errorText });
    return errorText;
};

export const formValidate = (inputsArray: Array<ValidateInput>): void => {
    inputsArray.forEach((input: ValidateInput): void => {
        inputValidate(
            input.refs.inputInnerRef.getProps(),
            input.getProps().setErrorMessage
        );
    });
};

export const repeatPasswordValidate = (
    oldPassword: ValidateInput,
    newPassword: ValidateInput
): void => {
    if (
        oldPassword.refs.inputInnerRef.getProps().value !==
        newPassword.refs.inputInnerRef.getProps().value
    ) {
        newPassword
            .getProps()
            .setErrorMessage({ errorMessage: 'пароли не совпадают' });
    }
};
