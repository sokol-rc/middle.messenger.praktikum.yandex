export type ValidateTypes =
    | 'login'
    | 'personName'
    | 'email'
    | 'phone'
    | 'password'
    | 'repeatPassword'
    | 'message';

export type ValidationResult = Array<Record<any, boolean>>;

const empty = (value: string | undefined | null) => {
    if (value === null || typeof value === 'undefined' || value === '') {
        return true;
    }
    return false;
};

const isInputValid = (value: string, pattern: RegExp): boolean =>
    new RegExp(pattern).test(value);

export const inputValidate = (inputProps: ValidateInput): boolean => {
    const { value, pattern } = inputProps;

    if (empty(pattern)) {
        return true;
    }
    if (empty(value)) {
        return false;
    }

    return isInputValid(value, pattern);
};

export const repeatPasswordValidate = (
    oldPassword: ValidateInput,
    newPassword: ValidateInput
): boolean => {
    if (
        oldPassword.refs.inputInnerRef.getProps().value !==
        newPassword.refs.inputInnerRef.getProps().value
    ) {
        return false;
    }
    return true;
};
