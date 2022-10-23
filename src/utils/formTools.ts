type FormValues = {
    [key: string]: string;
};

const getFormValues = (inputsRefs: Array<ValidateInput>): FormValues => {
    const formValues: FormValues = {};

    inputsRefs.forEach((inputRef) => {
        const inputProps: ValidateInput =
            inputRef.refs.inputInnerRef.getProps();

        if (inputProps.value !== '' && inputProps.type !== 'checkbox') {
            formValues[inputProps.name] = inputProps.value;
		}
    });

    return formValues;
};
export default getFormValues;

export const getAvatarFormValue = (avatarSelector: string) => { 
	const avatarInput = document.querySelector(avatarSelector);
	if (avatarInput) { 
		if (typeof avatarInput.files[0] === 'undefined') { 
			console.log('нет изображения');
			return null;
			
		}
		const formData = new FormData();
		formData.append("avatar", avatarInput.files[0]);
		return formData
	}

	return null;
	// return formData.get('avatar');
}
