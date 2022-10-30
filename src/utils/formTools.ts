export type FormValues = {
    [key: string]: string;
};

const getFormValues = <T = FormValues>(inputsRefs: Array<ValidateInput>): T => {
    const formValues = {} as T;

    inputsRefs.forEach((inputRef) => {
        const inputProps: ValidateInput =
            inputRef.refs.inputInnerRef.getProps();

		if (inputProps.value !== '' && inputProps.type !== 'checkbox') {
			// @ts-expect-error
            formValues[inputProps.name] = inputProps.value;
        }
    });

    return formValues;
};
export default getFormValues;

export const getAvatarFormValue = (avatarSelector: string): FormData | null => {
    const avatarInput: HTMLInputElement | null =
        document.querySelector(avatarSelector);
    if (avatarInput !== null && avatarInput.files !== null) {
        if (typeof avatarInput.files[0] === 'undefined') {

            return null;
        }
        const formData = new FormData();
        formData.append('avatar', avatarInput.files[0]);
        return formData;
    }

    return null;
};
