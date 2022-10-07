export type ValidateTypes =
    | 'login'
    | 'personName'
    | 'email'
    | 'phone'
    | 'password'
    | 'repeatPassword'
    | 'message';

export type ValidationResult = Array<Record<any, boolean>>;

const isInputValid = (value: string, pattern: RegExp): boolean =>
    new RegExp(pattern).test(value);

export const inputValidate = (inputProps: ValidateInput): boolean => {
    const { value, pattern } = inputProps;

    if (!pattern) {
        return true;
    }

    return isInputValid(value, pattern);
};

export const repeatPasswordValidate = (
    oldPassword: ValidateInput,
    newPassword: ValidateInput
): boolean => {
	console.log(oldPassword);
	console.log(newPassword);
	
	
    if (
        oldPassword.refs.inputInnerRef.getProps().value !==
        newPassword.refs.inputInnerRef.getProps().value
    ) {
        return false;
    }
    return true;
};
